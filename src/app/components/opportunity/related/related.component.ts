import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { OrderService } from '../../../_services/order.service';
import { Products } from 'src/app/_helpers/product';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ProductsDataSource} from '../../../datasources/productsdatasource'
import {tap} from 'rxjs/operators';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.css']
})
export class RelatedComponent implements OnInit {
  productItems: Products;
  displayedColumns: string[] = ['productname', 'quantity', 'salesprice', 'totalprice'];
  dataSource: ProductsDataSource;
  constructor(private _router: ActivatedRoute, private route: Router, private _orderService: OrderService){
   
  }
  @ViewChild(MatPaginator) itempaginator: MatPaginator;
  @ViewChild(MatSort) itemsort: MatSort;
  //@ViewChild('opportunityinput') opportunityinput: ElementRef;
  public errorMessage;
  public sub;
  public oppId;
  public ordId;
  public account;
  public closeddate;
  public amount;
  public owner;
  public opportunity;
  public params;
  ordernumber: string;
  queryParams: {};
  ngOnInit(){

    this.sub = this._router.paramMap.subscribe(params => {
      this.oppId = params.get('oppId');
      this.ordId = params.get('ordId');
    })
    this._router.queryParams.subscribe(params => {  
      this.params = params;      
      this.account = params['account'];
      this.closeddate = params['closeddate'];
      this.amount = params['amount'];
      this.owner = params['owner'];
      this.opportunity = params['opportunity']; 
      this.queryParams = {'account':this.account,'closeddate':this.closeddate,'amount':this.amount,'owner':this.owner,'opportunity':this.opportunity}
      // console.log('this.account'+this.account+'this.closeddate'+this.closeddate+'this.amount'+this.amount+'this.owner'+this.owner+'this.opportunity'+this.opportunity);
    })   
    this.productItems = this._router.snapshot.data["oppurtunityItem"];    
        this.dataSource = new ProductsDataSource(this._orderService);
        this.dataSource.loadproducts(this.oppId, '', 'asc', '', 1, 5); 
  }

  ngAfterViewInit() {    
  this.itemsort.sortChange.subscribe(() => this.itempaginator.pageIndex = 1);
  this.itempaginator.page.pipe(tap(() => this.loadProductsPage())).subscribe();
  }

  loadProductsPage() {
    this.dataSource.loadproducts(this.oppId, '', this.itemsort.direction, this.itemsort.active, this.itempaginator.pageIndex, this.itempaginator.pageSize);
}

}
