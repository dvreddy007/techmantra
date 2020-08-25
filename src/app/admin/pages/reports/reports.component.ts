import { Component, OnInit } from '@angular/core';
import { UserDataSource } from 'src/app/datasources/usersdatasource';
import { CommonService } from 'src/app/_services/common.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  value = '';
  displayedColumns: string[] = [];

  dataSource: UserDataSource;
  reportData: any[];
  reportResult: any[];
  constructor(private _commonService: CommonService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this._commonService.getReports().subscribe((response) => {
      this.reportData = response;
      //this.displayedColumns = Object.keys(this.reportData[0]);
    })
  }
  openReportDialog(report) {
    console.log(report.reportQuery);
    this._commonService.getReport(report.reportQuery).subscribe((response) => {
      this.reportResult = response;
      this.displayedColumns = Object.keys(this.reportResult[0]);
      console.log(JSON.stringify(this.displayedColumns));
      const dialogRef = this.dialog.open(ReportDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });

    })
  }
}
@Component({
  selector: 'dialog-open-report',
  templateUrl: 'dialog-open-report.html',
})
export class ReportDialogComponent extends ReportsComponent {
  public displayedColumns: any[];
}
