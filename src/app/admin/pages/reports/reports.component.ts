import { Component, OnInit } from '@angular/core';
import { UserDataSource } from 'src/app/datasources/usersdatasource';
import { CommonService } from 'src/app/_services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { ReportModalDialogComponent } from './report-modaldialog.component'
import { ActivatedRoute, Router } from '@angular/router';

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
  dialogValue: any[];
  sendValue: any[];
  public errorMesg;
  constructor(private router: Router, private _commonService: CommonService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this._commonService.getReports().subscribe((response) => {
      this.reportData = response;
      //this.displayedColumns = Object.keys(this.reportData[0]);
    })
  }

  editReport(report) {
    //console.log(JSON.stringify(report));
    this.router.navigate(['/admin/newreport'], { queryParams: report })
  }

  openReportDialog(report) {
    const dialogRef = this.dialog.open(ReportModalDialogComponent, {
      width: '95%',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: { pageValue: report }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogValue = result.data;
    });

  }
}

