import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { OrderService } from 'src/app/_services/order.service';
import { BehaviorSubject, of, Observable, from } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Opportunity } from 'src/app/_helpers/opportunity';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {OpportunityDataSource} from '../../datasources/opportunitydatasource'
import { combineLatest, fromEvent} from 'rxjs';
import { debounceTime, distinctUntilChanged, tap} from 'rxjs/operators'
@Component({
  selector: 'app-opportunitylist',
  templateUrl: './opportunitylist.component.html',
  styleUrls: ['./opportunitylist.component.css']
})
export class OpportunityListComponent implements AfterViewInit, OnInit {
  navLinks;
  opportunityItems: Opportunity;
  displayedColumns: string[] = ['opportunityid', 'opportunityname', 'opportunityowner', 'amount', 'stage', 'territory', 'createddate', 'lastmodifieddate'];
  dataSource: OpportunityDataSource;

  constructor(private _router: ActivatedRoute, private route: Router, private _orderService: OrderService){}
  @ViewChild(MatPaginator) itempaginator: MatPaginator;
  @ViewChild(MatSort) itemsort: MatSort;
  @ViewChild('opportunityinput') opportunityinput: ElementRef;
  public errorMessage;
  public sub;
  public oppId;
  public ordId;
  ordernumber: string;
  ngOnInit(){

    this.sub = this._router.paramMap.subscribe(params => {
      this.oppId = params.get('oppId');
      this.ordId = params.get('ordId');
    })
    this._router.queryParams.subscribe(params => {      
      this.ordernumber = params['ordernumber'];      
    })
    this.opportunityItems = this._router.snapshot.data["oppurtunityItem"];
    console.log(this.opportunityItems)
        this.dataSource = new OpportunityDataSource(this._orderService);
        this.dataSource.loadallopportunities('', 'asc', '', 1, 5);       
   }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.opportunityinput.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.itempaginator.pageIndex = 1;
                    this.loadOpportunityPage();
                })
            ).subscribe();

        // reset the paginator after sorting
        this.itemsort.sortChange.subscribe(() => this.itempaginator.pageIndex = 1);

        // on sort or paginate events, load a new page
        combineLatest(this.itemsort.sortChange, this.itempaginator.page)
        .pipe(tap(() => this.loadOpportunityPage()))
        .subscribe();
        this.itempaginator.page.pipe(tap(() => this.loadOpportunityPage())).subscribe();
  }  

  loadOpportunityPage() {
    this.dataSource.loadallopportunities(this.opportunityinput.nativeElement.value, this.itemsort.direction, this.itemsort.active, this.itempaginator.pageIndex, this.itempaginator.pageSize);
}

}