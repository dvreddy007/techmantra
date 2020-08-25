import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router, ActivatedRoute} from '@angular/router';
import { OrderItem } from '../../_helpers/orderitem';
import { tap} from 'rxjs/operators';
import {OrderItemsDataSource} from '../../datasources/orderitemdatasource';
import {OrderService} from '../../_services/order.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements AfterViewInit, OnInit {
  navLink;
  orderitem: OrderItem;  
  displayedColumns: string[] = ['ordersitemsid', 'productname', 'productfamily', 'currencyiso', 'listprice', 'createddate', 'lastmodifieddate'];
  dataSource: OrderItemsDataSource; 
  public errorMessage;
  public tableBg = { 
    background: "#fff",
    padding: "15px",
    border: "1px solid #ccc"
  }  
  constructor(private _router: ActivatedRoute, private route:Router, private _orderService: OrderService) { }
    
  @ViewChild(MatPaginator) itempaginator: MatPaginator;
  @ViewChild(MatSort) itemsort: MatSort;
  //@ViewChild('orderiteminput') orderiteminput: ElementRef;
  public sub;
  public id;
  public ordParams;
  public params;
  ordernumber: string;
  ngOnInit() {   
        this.sub = this._router.paramMap.subscribe(params => {
          this.id = params.get('id');         
        })
        // to populated the order item details
        this._router.queryParams.subscribe(params => {  
          this.ordernumber = params['ordernumber'];
          this.ordParams = params; 
        })         
        this.orderitem = this._router.snapshot.data["orderitem"];
        this.dataSource = new OrderItemsDataSource(this._orderService);
        this.dataSource.loadorderitems(this.id, '', 'asc', '', 1, 5);
        // console.log(JSON.stringify(this.dataSource.loadorderitems(this.id, '', 'asc', this.itemsort.active, this.itempaginator.pageIndex, this.itempaginator.pageSize)))
                             
        this.navLink = [
          {path:"ord-details/"+this.id, label : "Details"},
          {path:"ord-related/"+this.id, label : "Related"}       
        ]  
    }

  ngAfterViewInit() {    
        this.itempaginator.page.pipe(tap(() => this.loadOrdersItemsPage())).subscribe();
        this.itemsort.sortChange.subscribe(() => this.itempaginator.pageIndex = 1);
  }  

  loadOrdersItemsPage() {
    this.dataSource.loadorderitems(this.id, '', this.itemsort.direction, this.itemsort.active, this.itempaginator.pageIndex, this.itempaginator.pageSize);
}
  
}