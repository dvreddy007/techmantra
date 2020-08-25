import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Opportunity } from 'src/app/_helpers/opportunity';
import { OrderService } from 'src/app/_services/order.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  formDate: any;
  opportunityForm: FormGroup;
  constructor(private _router: ActivatedRoute, private route: Router, private fb: FormBuilder, private _orderService: OrderService) {
  }
  public sub;
  public oppId;
  getFormData(oppId) {
    this._orderService.getOppurtunity(oppId, 'asc', '', 1, 5)
      .subscribe((res) => {
        this.formDate = moment(res[0].createdDate).format('MMMM Do YYYY, h:mm:ss a');
        res[0].createdDate = this.formDate;
        this.formDate = moment(res[0].lastModifiedDate).format('MMMM Do YYYY, h:mm:ss a');
        res[0].lastModifiedDate = this.formDate;
        //res[0].amount = "$"+res[0].amount; 
        this.opportunityForm.patchValue(res[0]);
        console.log(JSON.stringify(res[0]));
      });
  };
  ngOnInit() {
    this._router.queryParams.subscribe(params => {
      this.oppId = params['opportunityid'];
      this.getFormData(params['opportunityid'])
    })

    this.opportunityForm = this.fb.group({
      opportunityName: [''],
      opportunityOwner: [''],
      accountName: [''],
      type: [''],
      amount: [''],
      stage: [''],
      expectedRevenue: [''],
      closeDate: [''],
      contractNumber: [''],
      forecastCategory: [''],
      territory: [''],
      createdDate: [''],
      lastModifiedDate: ['']
    })
    this.opportunityForm.disable();
  }
}
