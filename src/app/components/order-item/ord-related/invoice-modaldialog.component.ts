import {Component, OnInit,Optional, Inject} from '@angular/core'
import { Router } from '@angular/router';
import { OrderService } from 'src/app/_services/order.service';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';

@Component({
    selector: 'app-invoice-modaldialog',
    templateUrl: './invoice-modaldialog.component.html',
    styleUrls: ['./invoice-modaldialog.component.css']
})
export class InvoiceModaldialogComponent implements OnInit{
    invoice;
    ordId;
    spinner = false;
    public dataSource;
    displayedColumns: any[]
    constructor(private router:Router, private _orderService:OrderService,
        public dialogRef:MatDialogRef<InvoiceModaldialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data:any)
    {
        this.invoice = data.pageValue
        console.log(this.invoice)
    }

    displayColumns = ["productName","quantity","unitPrice","totalNetPrice"]
    displayedColumnsInvoice: string[] = ['invoiceNumber'];

    ngOnInit(){
        this.spinner = true;
        this._orderService.getInvoiceItem(this.invoice.invoiceNumber).subscribe((response) => {
            this.dataSource = response;
            console.log(this.dataSource)
            this.spinner = false;
        })
    }
    closeDialog(){
           this.dialogRef.close() 
    }
}

