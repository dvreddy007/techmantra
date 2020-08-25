import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { OrderService } from '../../../_services/order.service';
@Component({
  selector: 'app-ord-details',
  templateUrl: './ord-details.component.html',
  styleUrls: ['./ord-details.component.css']
})
export class OrdDetailsComponent implements OnInit {
  orderdetailsForm: FormGroup;
  constructor(private _router: ActivatedRoute, private route: Router, private fb: FormBuilder, private _orderService: OrderService) {
   }   
  public sub;
  public ordId; 
  getFormData(){
    this._orderService.getOrders(this.ordId, 'asc', '', 1, 5)
          .subscribe((res) => {                         
              this.orderdetailsForm.patchValue(res[0]);
              console.log(JSON.stringify(res[0]));
          });
  };
  ngOnInit() {
    this.sub = this._router.paramMap.subscribe(params => {
      this.ordId = params.get('id');
      console.log('the ordidis' + this.ordId);      
    })
    this.getFormData();
    this.orderdetailsForm = this.fb.group({
      account: [''],
      estimatedinstalldate: [''],
      owner: [''],
      status:  [''],
      type: [''],
      paymentterms: [''],
      orderamount: [''],
      currencyiso: [''],
      ordernumber: [''],
      shippingaddress: [''],
      billingaddress: [''],
      createddate: [''],
      createdby: [''],
      lastmodifieddate: [''],
      opportunityname: ['']
    })    
    this.orderdetailsForm.disable();
  }
}
