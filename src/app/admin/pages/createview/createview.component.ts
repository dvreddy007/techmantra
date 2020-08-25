import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../_services/common.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-createview',
  styleUrls: ['createview.component.css'],
  templateUrl: 'createview.component.html',
})
export class CreateViewComponent implements OnInit {
  constructor(
    private _router: ActivatedRoute,
    private viewService: CommonService,
  ) { }
  displayedColumns: string[] = ['viewname'];
  public sourceColumns;
  public dataSource;
  public error;
  public viewname;
  public tablename;
  public message;

  selectedColumns = [];
  moveAll(direction: string) {
    if (direction === 'right') {
      this.selectedColumns = [...new Set(...this.sourceColumns), ...new Set(...this.selectedColumns)];
      this.sourceColumns = [];
    } else {
      this.sourceColumns = [...new Set(...this.selectedColumns), ...new Set(...this.sourceColumns)];
      this.selectedColumns = [];
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  ngOnInit() {
    this._router.queryParams.subscribe((params) => {
      this.tablename = params['tablename'];
      this.viewname = params['viewname'];
    });
    // this.viewname = this._router.snapshot.data['viewname'];
    // this.tablename = this._router.snapshot.data['tablename'];
    //console.log(this.tablename + this.viewname);
    this.viewService.getTableColumnsViewMgmt(this.tablename).subscribe(
      (response) => (this.sourceColumns = response['queryResult']),
      (error) => (this.error = error)
    );
    this.viewService.getSelectedTableColumns(this.viewname).subscribe(
      (response) => (this.selectedColumns = response['queryResult']),
      (error) => (this.error = error)
    );
    // console.log(JSON.stringify(this.dataSource));
  }
  public columnsSelected = [];

  updateColumns() {
    this.selectedColumns.forEach((item) => {
      this.columnsSelected.push(item.columnName);
      //console.log(item.columnName);
    });
    let dataObj = {
      columns: this.columnsSelected,
      viewname: this.viewname,
    };
    this.viewService.updateColumns(dataObj).subscribe(
      (response) => (this.message = response.message),
      (error) => (this.error = error)
    );

  }
  clearAll() { }
}
