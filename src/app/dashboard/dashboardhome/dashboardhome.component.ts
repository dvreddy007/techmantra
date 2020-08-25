import { Component, OnInit, DoCheck } from '@angular/core';
import { CommonService } from '../../_services/common.service';
@Component({
  selector: 'app-dashboardhome',
  templateUrl: './dashboardhome.component.html',
  styleUrls: ['./dashboardhome.component.css'],
})
export class DashboardHomeComponent implements OnInit, DoCheck {
  dataSource: Object;
  chartConfig: Object;
  chartdataSource: object;
  public chartData;
  public pieData;
  public regionpieData;
  public wonOpportunities;
  public closingOpportunities;
  public pipelinedOpportunities;
  public lostOpportunities;
  constructor(private getDBChartData: CommonService) {
    this.chartConfig = {
      type: 'column2d',
      dataFormat: 'json',
    };
  }
  ngOnInit() {
    this.getDBChartData.getBarChartData().subscribe(
      (response) => {
        this.chartData = response;
        console.log(JSON.stringify(this.chartData));
      },
      (error) => (error = error)
    );

    this.getDBChartData.getIndustryPieData().subscribe(
      (response) => {
        this.pieData = response;
        console.log(JSON.stringify(this.chartData));
      },
      (error) => (error = error)
    );

    this.getDBChartData.getIndustryPieData().subscribe(
      (response) => {
        this.regionpieData = response;
        console.log(JSON.stringify(this.chartData));
      },
      (error) => (error = error)
    );

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
    //setInterval(()=>{
    this.dataSource = {
      chart: {
        caption:
          'The revenue genereated week wise for the orders received in the month',
        subCaption: '',
        xAxisName: 'Week wise orders revenue received',
        yAxisName: 'Order Amount',
        numberSuffix: '',
        theme: 'fusion',
        plotSpacePercent: 85,
      },
      data: this.chartData,
    };
    //  }, 1000)

    this.chartdataSource = {
      chart: {
        caption: 'Recommended Portfolio Split',
        subCaption: '',
        showValues: '1',
        showPercentInTooltip: '0',
        numberPrefix: '$',
        enableMultiSlicing: '1',
        theme: 'fusion',
      },
      data: this.pieData,
    };
  }
}
