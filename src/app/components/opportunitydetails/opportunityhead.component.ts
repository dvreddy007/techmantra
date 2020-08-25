import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../../_services/order.service';
@Component({
  selector: 'app-opportunityhead',
  templateUrl: './opportunityhead.component.html',
  styleUrls: ['./opportunityhead.component.less']
})
export class OpportunityHeaderComponent implements OnInit {

  constructor(private _orderService: OrderService) { }
  @Input() opportunityParams: string;
  public accountName;
  public closeDate;
  public amount;
  public opportunityOwner;
  public opportunityObj;
  public opportunityName;
  getHeaderDetailsData(oppId) {
    this._orderService.getOppurtunity(oppId, 'asc', '', 1, 5)
      .subscribe((res) => {
        this.opportunityObj = res[0];
        this.opportunityName = this.opportunityObj.opportunityName;
        this.accountName = this.opportunityObj.accountName;
        this.opportunityOwner = this.opportunityObj.opportunityOwner;
        this.amount = this.opportunityObj.amount;
        this.closeDate = this.opportunityObj.closeDate;
      });
  };
  ngOnInit() {
    this.getHeaderDetailsData(this.opportunityParams);
  }
}