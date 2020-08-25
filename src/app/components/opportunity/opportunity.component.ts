import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OrderService } from 'src/app/_services/order.service';
import { Opportunity } from 'src/app/_helpers/opportunity';
import { ActivatedRoute, Router } from '@angular/router';
import { OpportunityDataSource } from '../../datasources/opportunitydatasource';
@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.css']
})
export class OpportunityComponent implements AfterViewInit, OnInit {
  navLinks;
  opportunityItems: Opportunity;

  displayedColumns: string[] = [];
  dataSource: OpportunityDataSource;

  constructor(private _router: ActivatedRoute, private route: Router, private _orderService: OrderService) { }
  opportunityModel = new OpportunityDataSource(this._orderService);
  public errorMessage;
  public sub;
  public oppId;
  public ordId;
  public params;
  ordernumber: string;
  public oppParams;

  ngOnInit() {

    // to populated the opportunity item details
    this._router.queryParams.subscribe(params => {
      this.oppParams = params.opportunityId;
      this.oppId = params.opportunityId;
    })
    this.navLinks = [
      { path: "det/" + this.oppId, label: "Details" },
      { path: "rel/" + this.oppId, label: "Related" },
    ]

  }

  ngAfterViewInit() {

  }

}