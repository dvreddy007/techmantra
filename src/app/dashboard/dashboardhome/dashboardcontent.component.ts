import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { CommonService } from '../../_services/common.service';
@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboardcontent.component.html'
})

export class DashboardContentComponent implements OnInit, DoCheck{
	dataSource: Object;
  	chartConfig: Object;
  	chartdataSource: object;
  	public chartData;
 	public pieData;
 	public regionpieData;
	@Input() wonOpportunities: object;
	@Input() pipelinedOpportunities: object;
	@Input() closingOpportunities: object;
	@Input() lostOpportunities: object;
  	constructor(private getDBChartDataas: CommonService) {
	    this.chartConfig = {
	      type: 'column2d',
	      dataFormat: 'json',
	    };
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
  ngOnInit() {
    this.getDBChartDataas.getBarChartData().subscribe(
      (response) => {
        this.chartData = response;
        console.log(JSON.stringify(this.chartData));
      },
      (error) => (error = error)
    );

    this.getDBChartDataas.getIndustryPieData().subscribe(
      (response) => {
        this.pieData = response;
        console.log(JSON.stringify(this.chartData));
      },
      (error) => (error = error)
    );

    this.getDBChartDataas.getIndustryPieData().subscribe(
      (response) => {
        this.regionpieData = response;
        console.log(JSON.stringify(this.chartData));
      },
      (error) => (error = error)
    );

  }
}
