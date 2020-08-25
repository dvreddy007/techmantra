import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../../_services/order.service';
import * as moment from 'moment';

@Component({
  selector: 'app-accounthead',
  templateUrl: './accounthead.component.html',
  styleUrls: ['./accounthead.component.css']
})
export class AccountheadComponent implements OnInit {

  constructor(private _orderService: OrderService) { }
  @Input() accountParams: string;
  public url
  public accountObj;
  public accountName;
  public website;
  public phone;
  public accountOwner;
  public industry;
  public accountRecordType;
  public contractduration = 0;
  public contractremainingDays = 0;
  public elapsedDays = 0;
  public activeContractStartDate;
  public activeContractEndDate;
  public diffinContractdays;
  public contractdays;
  public currentDate = new Date();
  public changeColor = "primary";

  getHeaderDetailsData(accId) {
    this._orderService.getAccount(accId, 'asc', '', 1, 5)
      .subscribe((res) => {
        this.accountObj = res[0];
        if (this.accountObj !== undefined || this.accountObj !== null) {
          this.accountName = this.accountObj.accountName;
          this.accountOwner = this.accountObj.accountOwner;
          this.phone = this.accountObj.phone;
          this.industry = this.accountObj.industry;
          this.website = this.accountObj.website;
          this.accountRecordType = this.accountObj.accountRecordType;
          this.activeContractStartDate = moment(this.accountObj.activeContractStartDate);
          this.activeContractEndDate = moment(this.accountObj.activeContractEndDate);
          this.diffinContractdays = Math.abs(this.activeContractStartDate.diff(this.activeContractEndDate, 'days'));
          this.contractdays = moment(this.currentDate, "YYYY-MM-DD");
          //this.currentDate = Date.parse(this.currentDate)
          this.contractremainingDays = Math.abs(this.contractdays.diff(this.activeContractEndDate, 'days'));
          this.elapsedDays = Math.abs(this.contractdays.diff(this.activeContractStartDate, 'days'));
          console.log('..........' + Date.parse(this.contractdays) + '....' + this.activeContractStartDate + '.......' + this.activeContractEndDate)
          this.contractduration = (this.elapsedDays / this.diffinContractdays) * 100;
          if (this.contractduration >= 75) {
            this.changeColor = "warn";
          } else {
            this.changeColor = "primary";
          }
          console.log("diffinContractdays ..... " + this.diffinContractdays + "contractduration ..... days" + this.contractduration)
        }
      });
  };
  // openWebsite(){
  //   window.open(this.accountObj.website, '_blank');
  // }
  ngOnInit() {
    this.getHeaderDetailsData(this.accountParams);
    console.log(JSON.stringify(this.accountParams))
    console.log(moment(this.currentDate).format("YYYY-MM-DD"));

    //this.openWebsite();
  }
}
