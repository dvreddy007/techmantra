import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  OnChanges,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { Account } from '../../_helpers/account';
import { AccountDataSource } from '../../datasources/accountdatasource';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { combineLatest, fromEvent } from 'rxjs';
import { OrderService } from '../../_services/order.service';
@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
})
export class AccountListComponent implements AfterViewInit, OnInit, OnChanges {
  value = '';
  order: Account;
  public tableData;
  dataSource: AccountDataSource;
  public errorMessage;
  public error;
  public viewName = 'Account Grid View';
  public tableBg = {
    background: '#fff',
    padding: '15px',
    border: '1px solid #ccc',
  };
  public userName = sessionStorage.getItem('userName');
  public profileId = sessionStorage.getItem('profileId');
  public role = sessionStorage.getItem('role');
  public userProfile = sessionStorage.getItem('userProfile');
  constructor(
    private _router: ActivatedRoute,
    private route: Router,
    private _orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('accountinput') accountinput: ElementRef;
  public displayedColumns: string[] = [];
  ngOnInit() {
    this.order = this._router.snapshot.data['order'];
    this.loadAccountsOfCols(this.viewName, '', 'asc', '', 1, 10)
  }
  loadAccountsOfCols(viewName, filter, sortOrder, sortBy, pageNumber, pageSize) {
    this.loadAccountsforCols(viewName, filter, sortOrder, sortBy, pageNumber, pageSize);
    this.dataSource = new AccountDataSource(this._orderService);
    this.dataSource.loadaccounts(viewName, filter, sortOrder, sortBy, pageNumber, pageSize);
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.accountinput.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 1;
          this.loadAccountsOfCols(this.viewName, this.accountinput.nativeElement.value, this.sort.direction,
            this.sort.active,
            this.paginator.pageIndex,
            this.paginator.pageSize);
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 1));

    // on sort or paginate events, load a new page
    combineLatest(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadAccountsOfCols(this.viewName, this.accountinput.nativeElement.value, this.sort.direction,
        this.sort.active,
        this.paginator.pageIndex,
        this.paginator.pageSize)))
      .subscribe();
    this.paginator.page.pipe(tap(() => this.loadAccountsOfCols(this.viewName, this.accountinput.nativeElement.value, this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize))).subscribe();

  }

  getSelectedRow(row) {
    console.log(JSON.stringify(row));
    let rowCols = Object.keys(row);
    let accountnamecol = rowCols.find((item) => {
      if (item === 'accountId') {
        this.route.navigate(['account-details'], { queryParams: row });
      }
    });
  }
  loadAccountsforCols(viewName, filter, sortOrder, sortBy, pageNumber, pageSize) {
    let data = {
      viewName: viewName,
      filter: filter,
      sortOrder: sortOrder,
      sortBy: sortBy,
      pageNumber: pageNumber,
      pageSize: pageSize,
      userName: this.userName,
      profileId: this.profileId,
      role: this.role,
      userProfile: this.userProfile
    };
    this._orderService.getAllAccountsView(data).subscribe(
      (response) => {
        this.dataSource = response.queryResult;
        let resObj = response.queryResult[0];
        console.log(resObj);
        this.displayedColumns = Object.keys(resObj);
        this.displayedColumns = this.displayedColumns.filter(function (item) {
          return item !== 'accountId';
        });
        console.log(JSON.stringify(this.displayedColumns));
      },
      (error) => {
        this.error = error;
      }
    );
  }
  loadAccountsPage(viewName, filter, sortOrder, sortBy, pageNumber, pageSize) {
    this.dataSource.loadaccounts(viewName, filter, sortOrder, sortBy, pageNumber, pageSize);
  }
  ngOnChanges() {
  }

}
