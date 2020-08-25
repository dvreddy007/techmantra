import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { OrderService } from '../../_services/order.service';
import { Opportunity } from 'src/app/_helpers/opportunity';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { OpportunityDataSource } from '../../datasources/opportunitydatasource'
import { combineLatest, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators'
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-opportunitylist',
  templateUrl: './opportunitylist.component.html',
  styleUrls: ['./opportunitylist.component.css']
})
export class OpportunityListComponent implements AfterViewInit, OnInit {
  navLinks;
  value = '';
  opportunitys: Opportunity;
  displayedColumns: string[] = [];
  dataSource: OpportunityDataSource;

  constructor(private _router: ActivatedRoute, private route: Router, private _orderService: OrderService,
    private dialog: MatDialog) { }
  @Input() accountIdforOpportunities: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('opportunityinput') opportunityinput: ElementRef;
  public errorMessage;
  public sub;
  public oppId;
  public ordId;
  public error;
  public viewName = 'Opportunity Grid View';
  ordernumber: string;

  ngOnInit() {

    this.sub = this._router.paramMap.subscribe(params => {
      this.oppId = params.get('oppId');
      this.ordId = params.get('ordId');
    })
    this._router.queryParams.subscribe(params => {
      this.ordernumber = params['ordernumber'];
      console.log("this is " + this.ordernumber);
    })
    this.opportunitys = this._router.snapshot.data["oppurtunity"];
    //console.log(this.opportunitys)

    // checking the condition to load opportunities when redirecting from account details page for the account related opportunities
    if (this.accountIdforOpportunities !== '' || this.accountIdforOpportunities !== null) {
      this.loadOpportunitiesOfCols(this.viewName, this.accountIdforOpportunities, 'asc', '', 1, 5)
    } else {
      this.loadOpportunitiesOfCols(this.viewName, '', 'asc', '', 1, 5)
    }
    // console.log(JSON.stringify(this.dataSource.loadallopportunities('', 'asc', '', 1, 5)))
  }

  splitCamelCase() {
    return function (val) {
      if (typeof val !== "string") {
        return val;
      }
      return val
        .replace(/([A-Z])/g, (match) => ` ${match}`)
        .replace(/^./, (match) => match.toUpperCase());

    };
  }

  getSelectedRow(row) {
    console.log(JSON.stringify(row));
    let rowCols = Object.keys(row);
    let opportunitynamecol = rowCols.find((item) => {
      console.log(item);
      if (item === 'opportunityId') {
        this.route.navigate(['opportunity'], { queryParams: row });
      }
      if (item === 'accountId') {
        console.log(row.accountid)
        this.route.navigate(['account-details']);
      }
    });
    console.log(opportunitynamecol);
  }

  loadOpportunitiesOfCols(viewName, filter, sortOrder, sortBy, pageNumber, pageSize) {
    this.loadOpportunityforCols(viewName, filter, sortOrder, sortBy, pageNumber, pageSize);
    this.dataSource = new OpportunityDataSource(this._orderService);
    this.dataSource.loadallopportunities(viewName, filter, sortOrder, sortBy, pageNumber, pageSize);
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.opportunityinput.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 1;
          this.loadOpportunitiesOfCols(this.viewName, this.opportunityinput.nativeElement.value, this.sort.direction,
            this.sort.active,
            this.paginator.pageIndex,
            this.paginator.pageSize);
        })
      ).subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 1);

    // on sort or paginate events, load a new page
    combineLatest(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadOpportunitiesOfCols(this.viewName, this.opportunityinput.nativeElement.value, this.sort.direction,
        this.sort.active,
        this.paginator.pageIndex,
        this.paginator.pageSize)))
      .subscribe();
    this.paginator.page.pipe(tap(() => this.loadOpportunitiesOfCols(this.viewName, this.opportunityinput.nativeElement.value, this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize))).subscribe();
  }

  loadOpportunityforCols(viewName, filter, sortOrder, sortBy, pageNumber, pageSize) {
    let data = {
      viewName: viewName,
      filter: filter,
      sortOrder: sortOrder,
      sortBy: sortBy,
      pageNumber: pageNumber,
      pageSize: pageSize,
    };
    this._orderService.getAllOpportunitiesView(data).subscribe(
      (response) => {
        this.dataSource = response.queryResult;
        let resObj = response.queryResult[0];
        console.log(resObj);
        this.displayedColumns = Object.keys(resObj);
        this.displayedColumns.pop();
        this.displayedColumns = this.displayedColumns.filter(function (item) {
          return item !== 'opportunityid';
        });
        console.log(JSON.stringify(this.displayedColumns));
        // ...
      },
      (error) => {
        this.error = error;
      }
    );
  }

  loadOpportunityPage(viewName, filter, sortOrder, sortBy, pageNumber, pageSize) {
    this.dataSource.loadallopportunities(viewName, filter, sortOrder, sortBy, pageNumber, pageSize);
  }
}