import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from 'src/app/_services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit {
  casesForm:FormGroup
public accountid;
  constructor(private fb:FormBuilder, private _orderService: OrderService, private _router:ActivatedRoute) { }

  getFormData(accountid){
    this._orderService.getCases(this.accountid).subscribe(res=>{
      this.casesForm.patchValue(res[0])
      console.log(JSON.stringify(res[0]))
    })

  }
  ngOnInit(): void {

    this.casesForm = this.fb.group({
      accountId: [''],
      createdAt: [''],
      description: [''],
      dueAt: [''],
      externalId: [''],
      accountCurrency: [''],
      id: [''],
      priority: [''],
      recipient: [''],
      satisfactionRating: [''],
      status: [''],
      subject: [''],
      tags: [''],
      type: [''],
      updatedAt: [''],
      url: [''],
      via:['']
    })

    this._router.queryParams.subscribe(params=>{
      this.accountid = params.accountId;
      console.log("the account id is from the param is " +params.accountId)
      this.getFormData(params['accountid'])
    })
    this.casesForm.disable();
    // this.casesForm.controls['url'].disable();
    // this.casesForm.controls['id'].disable();
    // this.casesForm.controls['description'].disable();
    // this.casesForm.controls['via'].disable();
    // this.casesForm.controls['satisfactionRating'].disable();
    // this.casesForm.controls['createdAt'].disable();
    // this.casesForm.controls['updatedAt'].disable();

  }    


}
