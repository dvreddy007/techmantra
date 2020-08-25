import { Component, OnInit } from '@angular/core';
import {Order} from '../../_services/orderservice';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  public orders = [];
  public errorMessage;
 constructor(private _orderservice: Order) { 
   //this.orders = service.getOrders();
  }
  ngOnInit(){
    this._orderservice.getOrderList()
    .subscribe(data => this.orders = data,
    error => this.errorMessage = error);
    console.log(JSON.stringify(this.orders));
  }

}
