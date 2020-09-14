import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/_services/order.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
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

  public contractStartDate;
  public contractEndDate;
  public diffinContractdays;
  public contractdays;
  public currentDate = new Date();
  public contractremainingDays = 0;
  public elapsedDays = 0;
  public contractduration = 0;
  public changeColor;
  
  getHeaderDetailsData(ordId) {
    this._orderService.getOrders('', ordId, 'asc', '', 1, 5)
      .subscribe((res) => {
        this.orderObj = res[0];
        if (this.orderObj !== undefined || this.orderObj !== null) {

        this.accountName = this.orderObj.account;
        this.orderNumber = this.orderObj.orderNumber;
        this.estimatedInstallDate = this.orderObj.estimatedInstallDate;
        this.orderAmount = this.orderObj.orderAmount;
        this.status = this.orderObj.status;
        this.accountId = this.orderObj.accountId;
        this.contractStartDate = moment(this.orderObj.contractStartDate);
        this.contractEndDate = moment(this.orderObj.contractEndDate);
        this.diffinContractdays = Math.abs(this.contractStartDate.diff(this.contractEndDate,'days'));
        this.contractdays = moment(this.currentDate, "YYYY-MM-DD");
        this.contractremainingDays = Math.abs(this.contractdays.diff(this.contractEndDate, 'days'));
        this.elapsedDays = Math.abs(this.contractdays.diff(this.contractStartDate, 'days'));
        console.log('..........' + Date.parse(this.contractdays) + '....' + this.contractStartDate + '.......' + this.contractEndDate)
        this.contractduration = (this.elapsedDays / this.diffinContractdays) * 100;
          if (this.contractduration >= environment.contractdurationVal) {
            this.changeColor = "warn";
          } else {
            this.changeColor = "primary";
          }
          console.log("diffinContractdays ..... " + this.diffinContractdays + "contractduration ..... days" + this.contractduration)
        }
      });
  };
  ngOnInit() {
    this.getHeaderDetailsData(this.orderParams);
  }
}