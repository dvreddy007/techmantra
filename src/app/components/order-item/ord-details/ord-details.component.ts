import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Orders } from '../../../_helpers/order'
import { OrderService } from '../../../_services/order.service';
import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-ord-details',
  templateUrl: './ord-details.component.html',
  styleUrls: ['./ord-details.component.css']
})
export class OrdDetailsComponent implements OnInit {
  orderdetailsForm: FormGroup;
  formDate: any;
  constructor(private _router: ActivatedRoute, private route: Router, private fb: FormBuilder, private _orderService: OrderService,
    private currencyPipe: CurrencyPipe) {
  }
  public sub;
  public ordId;
  getFormData(ordId) {
    this._orderService.getOrders('', ordId, 'asc', '', 1, 5)
      .subscribe((res) => {
        this.formDate = moment(res[0].createdDate).format('MMMM Do YYYY, h:mm:ss a');
        res[0].createdDate = this.formDate;
        this.formDate = moment(res[0].lastModifiedDate).format('MMMM Do YYYY, h:mm:ss a');
        res[0].lastModifiedDate = this.formDate;
        this.orderdetailsForm.patchValue(res[0]);
        console.log(JSON.stringify(res[0]));
      });
  };
  ngOnInit() {
    this._router.queryParams.subscribe(params => {
      this.ordId = params.orderId;
      this.getFormData(params.orderId);
    })

    this.orderdetailsForm = this.fb.group({
      account: [''],
      estimatedInstallDate: [''],
      owner: [''],
      status: [''],
      type: [''],
      paymentTerms: [''],
      orderAmount: [''],
      currencyiso: [''],
      orderNumber: [''],
      shippingAddress: [''],
      billingAddress: [''],
      createdDate: [''],
      createdbBy: [''],
      lastModifiedDate: [''],
      opportunityName: ['']
    })
    this.orderdetailsForm.disable();
  }
}
