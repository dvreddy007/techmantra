import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  navLink;
  constructor(private _router: ActivatedRoute, private _orderService: OrderService) { }
  public accountParams;
  public sub;
  public accId;
  public accParams;

  ngOnInit() {
    // this.sub = this._router.paramMap.subscribe(params => {
    //   this.accParams = params.get('accountid');
    // })
    this._router.queryParams.subscribe(params => {
      console.log(params.accountId)
      this.accId = params.accountId;
      this.accParams = params.accountId;
    })
    this.navLink = [
      { path: "accdet/" + this.accId, label: "Details" },
      { path: "accrel/" + this.accId, label: "Related" }
    ]
  }

}