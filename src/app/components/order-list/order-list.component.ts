import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, Input, Output } from '@angular/core';
import { OrderService } from '../../_services/order.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { Orders } from '../../_helpers/order'
import { OrdersDataSource } from '../../datasources/orderdatasource'
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators'
import { combineLatest, fromEvent } from 'rxjs';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements AfterViewInit, OnInit {
  value = '';
  order: Orders;
  displayedColumns: string[] = [];
  dataSource: OrdersDataSource;
  public errorMessage;
  public viewName = "Orders Grid View";
  public error;
  public tableBg = {
    background: "#fff",
    padding: "15px",
    border: "1px solid #ccc"
  }
  constructor(private _router: ActivatedRoute, private route: Router, private _orderService: OrderService, private cdr: ChangeDetectorRef) { }
  @Input() accountIdforOrders: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('orderinput') orderinput: ElementRef;
  @Output() recLength: number;

  ngOnInit() {
    this.order = this._router.snapshot.data["order"];
    console.log(this.accountIdforOrders);
    // checking the condition to load orders when redirecting from account details page for the account related orders
    if (this.accountIdforOrders !== '' || this.accountIdforOrders !== null) {
      this.loadOrdersOfCols(this.viewName, this.accountIdforOrders, 'asc', '', 1, 10)
    } else {
      this.loadOrdersOfCols(this.viewName, '', 'asc', '', 1, 5)
    }
  }

  loadOrdersOfCols(viewName, filter, sortOrder, sortBy, pageNumber, pageSize) {
    this.loadOrdersforCols(viewName, filter, sortOrder, sortBy, pageNumber, pageSize);
    this.dataSource = new OrdersDataSource(this._orderService);
    this.dataSource.loadorders(viewName, filter, sortOrder, sortBy, pageNumber, pageSize);
  }

  loadOrdersforCols(viewName, filter, sortOrder, sortBy, pageNumber, pageSize) {
    let data = {
      viewName: viewName,
      filter: filter,
      sortOrder: sortOrder,
      sortBy: sortBy,
      pageNumber: pageNumber,
      pageSize: pageSize,
    };
    this._orderService.getAllOrdersView(data).subscribe(
      (response) => {
        this.dataSource = response.queryResult;
        let resObj = response.queryResult[0];
        console.log(resObj);
        this.displayedColumns = Object.keys(resObj);
        this.displayedColumns.pop();
        this.displayedColumns = this.displayedColumns.filter(function (item) {
          return item !== 'orderId';
        });
        console.log(JSON.stringify(this.displayedColumns));
        // ...
      },
      (error) => {
        this.error = error;
      }
    );
  }

  getSelectedRow(row) {
    let rowCols = Object.keys(row);
    let ordernamenamecol = rowCols.find((item) => {
      if (item === 'orderId') {
        //console.log(row.orderid);
        this.route.navigate(['order-item'], { queryParams: row });
      }
    });
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.orderinput.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 1;
          this.loadOrdersOfCols(this.viewName, this.orderinput.nativeElement.value, this.sort.direction,
            this.sort.active,
            this.paginator.pageIndex,
            this.paginator.pageSize);
        })
      ).subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.loadOrdersOfCols(this.viewName, this.orderinput.nativeElement.value, this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex = 1,
      this.paginator.pageSize));

    // on sort or paginate events, load a new page
    combineLatest(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadOrdersOfCols(this.viewName, this.orderinput.nativeElement.value, this.sort.direction,
        this.sort.active,
        this.paginator.pageIndex,
        this.paginator.pageSize)))
      .subscribe();
    this.paginator.page.pipe(tap(() => this.loadOrdersOfCols(this.viewName, this.orderinput.nativeElement.value, this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize))).subscribe();
  }
  loadOrdersPage() {
    this.dataSource.loadorders(this.viewName, this.orderinput.nativeElement.value, this.sort.direction, this.sort.active, this.paginator.pageIndex, this.paginator.pageSize);
  }

}