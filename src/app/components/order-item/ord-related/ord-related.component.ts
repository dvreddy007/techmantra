import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { OrderService } from '../../../_services/order.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderItem } from '../../../_helpers/orderitem';
import { combineLatest, fromEvent } from 'rxjs';
import { OrderItemsDataSource } from '../../../datasources/orderitemdatasource'
import { tap } from 'rxjs/operators';
import { Usage } from 'src/app/_helpers/usage';
@Component({
  selector: 'app-ord-related',
  templateUrl: './ord-related.component.html',
  styleUrls: ['./ord-related.component.css']
})
export class OrderRelatedComponent implements AfterViewInit, OnInit {
  navLink;
  orderitem: OrderItem;
  showIcon = true;
  usageIcon = true;
  orderUsage;
  public orderId;
  public error;
  displayedColumns: string[] = ['productname', 'quantity', 'unitprice', 'totalprice'];
  displayedColumns1: string[] = ['productname', 'consumedquantity', 'usageremainingquantity', 'usageBalanceAmount', 'startDate', 'endDate'];
  dataSource: OrderItemsDataSource;
  public errorMessage;
  public tableBg = {
    background: "#fff",
    padding: "15px",
    border: "1px solid #ccc"
  }
  constructor(private _router: ActivatedRoute, private route: Router, private _orderService: OrderService) { }


  @ViewChild(MatPaginator) itempaginator: MatPaginator;
  @ViewChild(MatSort) itemsort: MatSort;
  // @ViewChild('orderiteminput') orderiteminput: ElementRef;
  public sub;
  public id;
  ordernumber: string;
  onIcon() {
    this.showIcon = !this.showIcon;
  }

  onUsageIcon() {
    this.usageIcon = !this.usageIcon;
  }

  ngOnInit() {
    this.sub = this._router.paramMap.subscribe(params => {
      this.id = params.get('id');
    })
    this._router.queryParams.subscribe(params => {
      console.log(params);
      this.ordernumber = params['ordernumber'];
      console.log("this is " + this.ordernumber);
    })
    this.orderitem = this._router.snapshot.data["orderitem"];
    this.dataSource = new OrderItemsDataSource(this._orderService);
    this.dataSource.loadorderitems(this.id, '', 'asc', '', 1, 5);
    // console.log(JSON.stringify(this.dataSource.loadorderitems(this.id, '', 'asc', this.itemsort.active, this.itempaginator.pageIndex, this.itempaginator.pageSize)))

    // order usage
    this._orderService.getOrderUsage(this.id).subscribe(res => {
      this.orderUsage = res['queryResult'],
        (error) => (this.error = error)
      console.log(this.orderUsage)

    })

    this.navLink = [
      { path: "ord-rel", label: "Related" },
      { path: "ord-det", label: "Details" }
    ]

  }
  ngAfterViewInit() {
    // reset the paginator after sorting
    this.itemsort.sortChange.subscribe(() => this.itempaginator.pageIndex = 1);

    // on sort or paginate events, load a new page
    combineLatest(this.itemsort.sortChange, this.itempaginator.page)
      .pipe(tap(() => this.loadOrdersItemsPage()))
      .subscribe();
    this.itempaginator.page.pipe(tap(() => this.loadOrdersItemsPage())).subscribe();
  }

  loadOrdersItemsPage() {
    this.dataSource.loadorderitems(this.id, '', this.itemsort.direction, this.itemsort.active, this.itempaginator.pageIndex, this.itempaginator.pageSize);
  }

}