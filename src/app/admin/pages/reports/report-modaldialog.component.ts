
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/_services/common.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-report-modaldialog',
    templateUrl: './report-modaldialog.component.html',
    styleUrls: ['./report-modaldialog.component.css']
})
export class ReportModalDialogComponent implements OnInit {
    public dataSource;
    reportName: string;
    displayedColumns: any[];
    spinner = false;
    fromDialog: string;
    public query: string;
    public report;

    constructor(private router: Router, private _commonService: CommonService,
        public dialogRef: MatDialogRef<ReportModalDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.report = data.pageValue;
        console.log(this.report)
        this.query = data.pageValue.reportQuery;
        this.reportName = data.pageValue.reportName;
    }

    ngOnInit() {
        this.spinner = true;
        this._commonService.getReport(this.query).subscribe((response) => {
            this.dataSource = response;
            this.displayedColumns = Object.keys(this.dataSource[0]);
            this.spinner = false;
        })
    }
    editReport(report) {
        console.log(JSON.stringify(report));
        this.router.navigate(['/admin/newreport'], { queryParams: { report, key: "Edit" } })
        this.dialogRef.close();
    }

    closeDialog() {
        this.dialogRef.close();
    }
}