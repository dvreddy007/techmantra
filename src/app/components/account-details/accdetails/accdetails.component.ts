import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from '../../../_services/order.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import * as moment from 'moment';
import { CommonService } from 'src/app/_services/common.service';
import { ContentObserver } from '@angular/cdk/observers';
@Component({
  selector: 'app-accdetails',
  templateUrl: './accdetails.component.html',
  styleUrls: ['./accdetails.component.css']
})
export class AccdetailsComponent implements OnInit {
  accountForm: FormGroup;
  formattedAmount;
  formDate: any;
  amount;
  selectedValue: string;
  keySuccessResp
  public selectedObjKey = {};
  public accountId = "";
  public csmPrimaryKey = "";
  public csmSecondaryKey = "";
  constructor(private currencyPipe: CurrencyPipe, private _router: ActivatedRoute, private route: Router, private fb: FormBuilder, private _orderService: OrderService, private commonService: CommonService) {
  }
  public sub;
  public accountDetails;
  @Input() accountParams: string;

  getFormData(accountid) {
    this._orderService.getAccount(accountid, 'asc', '', 1, 5)
      .subscribe((res) => {
        this.formDate = moment(res[0].createdDate).format('MM/DD/YYYY, h:mm:ss a');
        res[0].createdDate = this.formDate;
        this.formDate = moment(res[0].lastModifiedDate).format('MM/DD/YYYY, h:mm:ss a');
        res[0].lastModifiedDate = this.formDate;
        this.accountForm.patchValue(res[0]);
        this.accountDetails = res[0];
        console.log(JSON.stringify(res[0]));
      });
  };

  formatMoney(value) {
    const temp = `${value}`.replace(/\,/g, "");
    return this.currencyPipe.transform(temp).replace("$", "");
  };
  transformTotal() {
    const value = this.accountForm.controls.accountcurrency.value;
    this.accountForm.controls.accountcurrency.setValue(
      this.formatMoney(value.replace(/\,/g, "")),
      { emitEvent: false }
    );
  }
  ngOnInit() {

    //this.getFormData(this.accountParams);
    this.accountForm = this.fb.group({
      accountId: [''],
      accountNumber: [''],
      accountRecordType: [''],
      accountOwner: [''],
      accountName: [''],
      accountCurrency: [''],
      phone: [''],
      website: [''],
      billingAddress: [''],
      billingCountry: [''],
      shippingAddress: [''],
      industry: [''],
      territory: [''],
      annualRevenue: [''],
      createdDate: [''],
      lastModifiedDate: [''],
      // selectedKey: [''],
      csmPrimaryKey: [''],
      csmSecondaryKey: [''],
      onboardingStage: [''],
      customerJourneyStage: ['']
    })

    this._router.queryParams.subscribe(params => {
      this.accountId = params['accountId'];

      console.log("the account id is from the param is " + JSON.stringify(params.accountId));
      this.getFormData(params.accountId)
    })
    this.accountForm.disable();
    console.log(this.accountDetails.selectedKey)
  }
  editKey() {
    this.selectedObjKey = {
      csmPrimaryKey: this.csmPrimaryKey,
      csmSecondaryKey: this.csmSecondaryKey,
      accountId: this.accountId
    }
    console.log(this.selectedObjKey);
    this.commonService.editAccountDetails(this.selectedObjKey).subscribe(res => {
      this.keySuccessResp = res.message;
      console.log(this.keySuccessResp)
    }), (error => {
      console.log(error)
    })
  }
}
