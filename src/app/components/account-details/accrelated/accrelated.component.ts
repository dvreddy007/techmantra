import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { OrderService } from '../../../_services/order.service';

@Component({
  selector: 'app-accrelated',
  templateUrl: './accrelated.component.html',
  styleUrls: ['./accrelated.component.css']
})
export class AccrelatedComponent implements OnInit {
  public accountid;
  public cases;
  public error;
  showIcon = true;
  showIcon_opp = true;
  casesIcon = true;
  constructor(private currencyPipe: CurrencyPipe, private _router: ActivatedRoute, private route: Router, private fb: FormBuilder, private _orderService: OrderService) {
  }
  displayedColumns: string[] = ['id', 'subject', 'priority', 'type', 'status', 'dueAt','createdAt'];

  onIcon() {
    this.showIcon = !this.showIcon;
  }
  onIcon_opp() {
    this.showIcon_opp = !this.showIcon_opp;
  }
  onCasesIcon() {
    this.casesIcon = !this.casesIcon;
  }
  ngOnInit() {
    this._router.queryParams.subscribe(params => {
      this.accountid = params.accountId;
      console.log("the account id is from the param is " + params.accountId);

    })

    this._orderService.getCases(this.accountid).subscribe(res=>{
      this.cases = res,
      (error) => (this.error = error)
      console.log(this.cases)
    })
  }

}
