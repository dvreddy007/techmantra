import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/_services/order.service';
@Component({
  selector: 'app-orderhead',
  templateUrl: './orderhead.component.html',
  styleUrls: ['./orderhead.component.less']
})
export class OrderHeaderComponent implements OnInit {

  constructor(private _orderService: OrderService) { }
  @Input() orderParams: string;
  public orderNumber;
  public orderObj;
  public accountName;
  public estimatedInstallDate;
  public orderAmount;
  public accountId;
  public owner;
  public status;
  getHeaderDetailsData(ordId) {
    this._orderService.getOrders('', ordId, 'asc', '', 1, 5)
      .subscribe((res) => {
        this.orderObj = res[0];
        this.accountName = this.orderObj.account;
        this.orderNumber = this.orderObj.orderNumber;
        this.estimatedInstallDate = this.orderObj.estimatedInstallDate;
        this.orderAmount = this.orderObj.orderAmount;
        this.status = this.orderObj.status;
        this.accountId = this.orderObj.accountId;
      });
  };
  ngOnInit() {
    this.getHeaderDetailsData(this.orderParams);
  }
}