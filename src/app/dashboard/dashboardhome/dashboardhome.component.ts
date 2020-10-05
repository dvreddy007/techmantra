import { Component, OnInit, DoCheck, NgModule } from '@angular/core';
import { CommonService } from '../../_services/common.service';
@Component({
  selector: 'app-dashboardhome',
  templateUrl: './dashboardhome.component.html',
  styleUrls: ['./dashboardhome.component.css'],
})
export class DashboardHomeComponent implements OnInit, DoCheck {
  public wonOpportunities;
  public closingOpportunities;
  public pipelinedOpportunities;
  public lostOpportunities;
  constructor(private getDBChartData: CommonService) {
    
  }
  ngOnInit() {
   

    // dashboard widgets related to opportunities widgets info
    this.getDBChartData.getWonOpportunities().subscribe(
      (response) => {
        this.wonOpportunities = response;
        console.log(JSON.stringify(this.wonOpportunities));
      },
      (error) => (error = error)
    );

    this.getDBChartData.getClosingOpportunities().subscribe(
      (response) => {
        this.closingOpportunities = response;
        console.log(JSON.stringify(this.closingOpportunities));
      },
      (error) => (error = error)
    );

    this.getDBChartData.getPipelinedOpportunities().subscribe(
      (response) => {
        this.pipelinedOpportunities = response;
        console.log(JSON.stringify(this.pipelinedOpportunities));
      },
      (error) => (error = error)
    );

    this.getDBChartData.getLostOpportunities().subscribe(
      (response) => {
        this.lostOpportunities = response;
        console.log(JSON.stringify(this.lostOpportunities));
      },
      (error) => (error = error)
    );

  }
  ngDoCheck() {
   

  }
}

