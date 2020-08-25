import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { OrderService } from '../../_services/order.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderItem } from '../../_helpers/orderitem';
import { OrderItemsDataSource } from '../../datasources/orderitemdatasource';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements AfterViewInit, OnInit {
  navLink;
  orderitem: OrderItem;
  displayedColumns: string[] = [];
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
  //@ViewChild('orderiteminput') orderiteminput: ElementRef;
  public sub;
  public id;
  public ordParams;
  public params;
  accountid: string;
  ordernumber: string;
  ngOnInit() {

    this._router.queryParams.subscribe(params => {
      console.log(JSON.stringify(params));
      this.id = params.orderId;
      this.ordParams = params.orderId;
    })

    this.navLink = [
      { path: "ord-details/" + this.id, label: "Details" },
      { path: "ord-related/" + this.id, label: "Related" }
    ]
  }

  ngAfterViewInit() {
  }

}