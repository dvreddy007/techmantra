import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { OrderService } from '../../../_services/order.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderItem } from '../../../_helpers/orderitem';
import { combineLatest, fromEvent } from 'rxjs';
import { OrderItemsDataSource } from '../../../datasources/orderitemdatasource'
import { tap } from 'rxjs/operators';
import { Usage } from 'src/app/_helpers/usage';
import { environment } from 'src/environments/environment';
import { InvoiceModaldialogComponent } from './invoice-modaldialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-ord-related',
  templateUrl: './ord-related.component.html',
  styleUrls: ['./ord-related.component.css']
})
export class OrderRelatedComponent implements AfterViewInit, OnInit {
  navLink;
  orderitem: OrderItem;
  showIcon = true;
  usageIcon = true;
  invoiceIcon = true;
  orderUsage;
  invoice;
  dialogValue;
  public orderId;
  public error;
  displayedColumns: string[] = ['productname', 'quantity', 'unitprice', 'totalprice'];
  displayedColumns1: string[] = ['productname', 'consumedquantity', 'usageremainingquantity', 'usageBalanceAmount', 'startDate', 'endDate', 'usage'];
  displayedColumnsInvoice: string[] = ['invoiceNumber', 'invoiceAmount', 'invoiceDate', 'paymentTerms'];
  dataSource: OrderItemsDataSource;
  public errorMessage;
  public tableBg = {
    background: "#fff",
    padding: "15px",
    border: "1px solid #ccc"
  }
  constructor(private _router: ActivatedRoute, private route: Router, private _orderService: OrderService,
    public dialog: MatDialog) { }

  public usage: number;
  public usageTime: number;
  public changeusageBarColor;
  public changeusageTimeColor;
  public usageBoundVal = environment.usageBoundVal;
  public usageTimeBoundVal = environment.usageTimeBoundVal;
  @ViewChild(MatPaginator) itempaginator: MatPaginator;
  @ViewChild(MatSort) itemsort: MatSort;
  // @ViewChild('orderiteminput') orderiteminput: ElementRef;
  public sub;
  public id;
  ordernumber: string;
  onIcon() {
    this.showIcon = !this.showIcon;
  }

  onUsageIcon() {
    this.usageIcon = !this.usageIcon;
  }
  onInvoiceIcon() {
    this.invoiceIcon = !this.invoiceIcon;

  }

  ngOnInit() {

    // if (this.usage >= environment.usageBoundVal) {
    //   this.changeusageBarColor = "accent";
    // } else {
    //   this.changeusageBarColor = "primary";
    // }

    // if (this.usageTime >= environment.usageTimeBoundVal) {
    //   this.changeusageTimeColor = "accent";
    // } else {
    //   this.changeusageTimeColor = "primary";
    // }

    this.sub = this._router.paramMap.subscribe(params => {
      this.id = params.get('id');
    })
    this._router.queryParams.subscribe(params => {
      console.log(params);
      this.ordernumber = params['ordernumber'];
      console.log("this is " + this.ordernumber);
    })
    this.orderitem = this._router.snapshot.data["orderitem"];
    this.dataSource = new OrderItemsDataSource(this._orderService);
    this.dataSource.loadorderitems(this.id, '', 'asc', '', 1, 5);
    // console.log(JSON.stringify(this.dataSource.loadorderitems(this.id, '', 'asc', this.itemsort.active, this.itempaginator.pageIndex, this.itempaginator.pageSize)))

    // order usage
    this._orderService.getOrderUsage(this.id).subscribe((res) => {
      this.orderUsage = res['queryResult'];
    },
      (error) => (this.error = error)
    )

    // Invoice
    this._orderService.getInvoice(this.id).subscribe(res => {
      this.invoice = res,
        (error) => (this.error = error)
      console.log(this.invoice)

    })

    this.navLink = [
      { path: "ord-rel", label: "Related" },
      { path: "ord-det", label: "Details" }
    ]

  }

  openInvoiceDialog(inv) {
    const dialogRef = this.dialog.open(InvoiceModaldialogComponent, {
      width: '95%',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: { pageValue: inv }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogValue = result.data;
    });

  }


  ngAfterViewInit() {
    // reset the paginator after sorting
    this.itemsort.sortChange.subscribe(() => this.itempaginator.pageIndex = 1);

    // on sort or paginate events, load a new page
    combineLatest(this.itemsort.sortChange, this.itempaginator.page)
      .pipe(tap(() => this.loadOrdersItemsPage()))
      .subscribe();
    this.itempaginator.page.pipe(tap(() => this.loadOrdersItemsPage())).subscribe();
  }

  loadOrdersItemsPage() {
    this.dataSource.loadorderitems(this.id, '', this.itemsort.direction, this.itemsort.active, this.itempaginator.pageIndex, this.itempaginator.pageSize);
  }

}