import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  OnChanges,
  Inject,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CommonService } from '../../../_services/common.service';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { field, value } from '../../../global.modal';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormGroup } from '@angular/forms';
import { from } from 'rxjs';
import { ReportGenDataSource } from '../../../datasources/reportdatasource';
import * as moment from 'moment';
import { items } from 'fusioncharts';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Base64 } from 'js-base64';
export interface DialogData {
  reportname: string;
  name: string;
}

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.css']
})
export class NewReportComponent implements OnInit {
  eHr: string = "";
  myDate;
  // disabled = true;
  actions = ["Custom", "Last 3months", "Last 6months", "Current FY", "Previous FY", "Previous 2FY"]

  onDateChange(value) {
    // console.log(value)
    if (value == "Last 3months") {
      this.eHr = (moment().subtract(3, 'month').format('YYYY-MM-DD'));
      this.myDate = new Date(Date.now());
    }
    else if (value == "Last 6months") {
      this.eHr = (moment().subtract(6, 'month').format('YYYY-MM-DD'));
      this.myDate = new Date();
    }
    else if (value == "Current FY") {
      this.eHr = (moment("01-01-2020").format('YYYY-MM-DD'));
      this.myDate = new Date();
    }
    else if (value == "Previous FY") {
      this.eHr = (moment("01-01-2019").format('YYYY-MM-DD'));
      this.myDate = (moment("12-12-2019").format('YYYY-MM-DD'));
      // this.myDate = new Date();
    }
    else if (value == "Previous 2FY") {
      this.eHr = (moment("01-01-2018").format('YYYY-MM-DD'));
      this.myDate = (moment("12-12-2018").format('YYYY-MM-DD'));
      // this.myDate = new Date();
    }
  }
  public reportDataSource;
  displayedColumns: string[] = [];
  @ViewChild(MatSort) sort: MatSort;
  showIcon = true;
  spinner = false;
  reportForm: FormGroup;
  showIcon_opp = true;
  labelPosition = "after";
  baseTable = true;
  opportunitybaseTableVal = false;
  ordersbaseTableVal = false;
  selectedTable: string = '';
  public tableSelectedforFilter: any[] = [];
  public selectedDisplayColumns = [];
  public reportGenTableList;
  public reportGenSelectedTableList;
  disabled = false;
  public tablename;
  public accounttablecolumnList;
  public ordertablecolumnList;
  public opportunitytablecolumnList;
  public error;
  public formData;
  public rangeFrom;
  public selectedSourceTableColumns;
  public selectedTableColumns = [];
  public columnsSelected = [];
  public reportDisplayColumns = [];
  public newTableObj = [];
  public dateColumns = [];
  public columnGroupedByTable = [];
  public tableData = [];
  public selectedDateCol;
  public reportId;
  public editReportObj;
  public errorMesg;
  panelOpenState = false;
  isSelected = [];
  isSaveReport = false;
  public dialogData;
  reportname: string;
  name: string;
  public show = 1;
  value: value = {
    label: "",
    value: ""
  };
  success = false;
  tablefieldModel: any = [];

  modelFields: Array<field> = [];
  model: any = {
    attributes: this.modelFields
  };
  report = false;
  reports: any = [];

  constructor(public dialog: MatDialog, private _router: ActivatedRoute,
    private viewService: CommonService) { }

  getRelatedTables(selectedTable) {
    this.spinner = true;
    this.newTableObj = [];
    this.viewService.getReportTableList(selectedTable).subscribe((response) => {
      this.reportGenSelectedTableList = response;
      // console.log('the related tables are ...' + JSON.stringify(this.reportGenSelectedTableList))
      this.reportGenSelectedTableList.forEach((item) => {
        this.viewService.getTableColumns(item).subscribe((response) => {
          this.tablefieldModel = response;
          if (this.editReportObj) {
            this.tablefieldModel.forEach((item, index) => {
              if (this.editReportObj.displayColumns.includes(item.fieldName)) {
                item.isSelected = true
              } else {
                item.isSelected = false
              }
            })
          }
          this.selectedSourceTableColumns = response;
          this.selectedDisplayColumns = response;
          this.spinner = false;
          this.newTableObj.push({ 'tableName': item.table_name, tablefieldModel: response });
          this.newTableObj.forEach((item) => {
            this.selectedTableColumns = item.tablefieldModel.filter((item) => item.isSelected === true)
            this.selectedTableColumns.forEach((item) => { this.reportDisplayColumns.push(item.fieldName) })
            this.selectedTableColumns.forEach((item) => { this.tableSelectedforFilter.push({ tableName: item.tableName, relationKey: item.relationKey }) })
          })

        },
          (error) => (this.error = error)
        );
      });
    },
      (error) => (this.error = error)
    );
  }
  getSelectedTable(selectedColumn): void {
    this.formData = selectedColumn
  }
  selectTableforReport(event: MatCheckboxChange): void {
    // console.log(event.checked);    
    if (event.checked === true) {
      this.disabled = true;
      this.newTableObj.forEach((item) => {
        this.selectedTableColumns = item.tablefieldModel.filter((item) => item.isSelected === true)
        this.selectedTableColumns.forEach((item) => { this.reportDisplayColumns.push(item.fieldName) })
        this.selectedTableColumns.forEach((item) => { this.tableSelectedforFilter.push({ tableName: item.tableName, relationKey: item.relationKey }) })
      })
    }
  }

  onIcon_opp() {
    this.showIcon_opp = !this.showIcon_opp;
  }

  onDragStart(event: DragEvent) {
    // console.log("drag started", JSON.stringify(event, null, 2));
  }

  onDragEnd(event: DragEvent) {
    // console.log("drag ended", JSON.stringify(event, null, 2));
  }

  onDraggableCopied(event: DragEvent) {
    // console.log("draggable copied", JSON.stringify(event, null, 2));
  }

  onDraggableLinked(event: DragEvent) {
    // console.log("draggable linked", JSON.stringify(event, null, 2));
  }

  onDragged(item: any, list: any[], effect: DropEffect) {
    if (effect === "move") {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }
  }

  onDraggedDisplayCols(item: any, list: any[], effect: DropEffect) {
    if (effect === "move") {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }
  }

  onDragCanceled(event: DragEvent) {
    //console.log("drag cancelled", JSON.stringify(event, null, 2));
  }

  onDragover(event: DragEvent) {
    // console.log("dragover", JSON.stringify(event, null, 2));
  }

  onDragoverDisplay(event: DragEvent) {
    // console.log("dragover", JSON.stringify(event, null, 2));
  }

  onDropDisplayColumns(event: DndDropEvent, list?: any[]) {
    if (list && (event.dropEffect === "copy" || event.dropEffect === "move")) {

      if (event.dropEffect === "copy")
        event.data.name = event.data.type + '-' + new Date().getTime();
      let index = event.index;
      if (typeof index === "undefined") {
        index = list.length;
      }
      list.splice(index, 0, event.data);
    }
    // console.log("ondragged", JSON.stringify(list));
  }

  onDrop(event: DndDropEvent, list?: any[]) {
    if (list && (event.dropEffect === "copy" || event.dropEffect === "move")) {

      if (event.dropEffect === "copy")
        event.data.name = event.data.type + '-' + new Date().getTime();
      let index = event.index;
      if (typeof index === "undefined") {
        index = list.length;
      }
      list.splice(index, 0, event.data);
    }
  }

  addValue(values) {
    values.push(this.value);
    this.value = { label: "", value: "" };
  }

  removeField(i) {
  }

  test() { }
  updateAllComplete() { }
  updateForm() {
    let input = new FormData;
    input.append('id', this.model._id);
    input.append('name', this.model.name);
    input.append('description', this.model.description);
    input.append('bannerImage', this.model.theme.bannerImage);
    input.append('bgColor', this.model.theme.bgColor);
    input.append('textColor', this.model.theme.textColor);
    input.append('attributes', JSON.stringify(this.model.attributes));
  }
  initReport() {
    this.report = true;
    let input = {
      id: this.model._id
    }
  }
  toggleValue(item) {
    item.selected = !item.selected;
  }

  submit() {
  }

  dropColumn(event: CdkDragDrop<string[]>) {
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

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }

  ngOnInit() {
    this._router.queryParams.subscribe(params => {
      console.log(JSON.stringify(params.reportId));
      if (params.reportId) {
        this.reportId = params.reportId;
        this.spinner = true;
        this.viewService.editReport(this.reportId).subscribe((response) => {
          this.editReportObj = response[0].reportObject;
          this.selectedDateCol = this.editReportObj.date_field.column_name;
          this.rangeFrom = this.editReportObj.range_from
          this.onDateChange(this.rangeFrom)
          this.getRelatedTables(this.editReportObj.selectedTable);
          this.selectedTable = this.editReportObj.selectedTable;
          this.model = this.editReportObj.model;
          console.log("The edit report obj is .... " + JSON.stringify(this.editReportObj.selectedTable))
          this.spinner = false;
        },
          (error) => (this.error = error)
        );
      }
    })



    this.spinner = true;
    this.viewService.getTableList().subscribe((response) => {
      this.reportGenTableList = response;

      this.spinner = false;
    },
      (error) => (this.error = error)
    );
    this.viewService.getDateColumns().subscribe((response) => {
      this.dateColumns = response;
      // creating the array for group by table name of date field columns
      const groupBy = (array, key) => {
        return array.reduce((result, currentValue) => {
          (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
          );
          return result;
        }, {});
      };

      // Group by table name as key to the date columns array
      this.columnGroupedByTable = groupBy(this.dateColumns, 'table_name');
      this.tableData = Object.keys(this.columnGroupedByTable)
      this.spinner = false;
    },
      (error) => (this.error = error)
    );
  }
  groupBy(arrayObj, property) {
    return arrayObj.reduce(function (accumulator, object) {
      const key = object[property];
      if (!accumulator[key]) {
        accumulator[key] = [];
      }
      accumulator[key].push(object);
      return accumulator;
    }, {});
  }

  // filter duplicate items from selected columns tables from checkboxes
  arrayUnique(arr, uniqueKey) {
    const flagList = new Set()
    return arr.filter(function (item) {
      if (!flagList.has(item[uniqueKey])) {
        flagList.add(item[uniqueKey])
        return true
      }
    })
  }

  generateReportModel(model, selectedTable, isSave, reportName) {
    console.log('model for edit page' + JSON.stringify(model));
    this.spinner = true;
    let children = this.groupBy(model.attributes, 'tableName');
    // console.log(this.tableSelectedforFilter);
    let filters = children[selectedTable];
    let jsontoSubmit = {};
    if (selectedTable === "ACCOUNT") {
      delete children.ACCOUNT;
    } else if (selectedTable === "ORDERS") {
      delete children.ORDERS;
    } else {
      delete children.OPPORTUNITY;
    }

    let uniqueDisplayColumns = this.reportDisplayColumns.filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    });
    jsontoSubmit = {
      reportObject: {
        model: model,
        selectedTable: selectedTable,
        reportDisplayColumns: this.tableSelectedforFilter,
        displayColumns: uniqueDisplayColumns,
        date_field: this.formData,
        date_from: this.eHr,
        date_to: this.myDate,
        range_from: this.rangeFrom
      },
      parent: {
        tableName: selectedTable,
        filters: filters
      },

      children,
      displayColumns: uniqueDisplayColumns,
      selectedTables: this.arrayUnique(this.tableSelectedforFilter, 'tableName'),
    }

    this.viewService.generateReport(jsontoSubmit).subscribe((response) => {
      if (response !== undefined || response !== null) {
        this.reportDataSource = response;
        this.spinner = false;
        this.displayedColumns = Object.keys(this.reportDataSource[0]);
        this.isSaveReport = true;
      } else {
        let errorMesg = "No data found with the filters";
      }
      //this.spinner = false;
    },
      (error) => { this.error = error; this.spinner = false; }
    );
  }

  saveReportDialog(model, selectedTable, isSave, reportName): void {
    const dialogRef = this.dialog.open(SaveReportDialog, {
      width: '25rem',
      height: '15rem',
      data: { name: this.name, reportname: this.reportname }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.reportname = result;
      this.spinner = true;
      let children = this.groupBy(model.attributes, 'tableName');
      let filters = children[selectedTable];
      let jsontoSubmit = {};
      if (selectedTable === "ACCOUNT") {
        delete children.ACCOUNT;
      } else if (selectedTable === "ORDERS") {
        delete children.ORDERS;
      } else {
        delete children.OPPORTUNITY;
      }
      let uniqueDisplayColumns = this.reportDisplayColumns.filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
      })
      jsontoSubmit = {
        reportObject: {
          model: model,
          selectedTable: selectedTable,
          reportDisplayColumns: this.tableSelectedforFilter,
          displayColumns: uniqueDisplayColumns,
          date_field: this.formData,
          date_from: this.eHr,
          date_to: this.myDate,
          range_from: this.rangeFrom
        },

        isSave: isSave,
        reportName: this.reportname,
        parent: {
          tableName: selectedTable,
          filters: filters
        },
        children,
        displayColumns: uniqueDisplayColumns,
        selectedTables: this.arrayUnique(this.tableSelectedforFilter, 'tableName'),
      }
      this.viewService.generateReport(jsontoSubmit).subscribe((response) => {
        this.reportDataSource = response;
        this.displayedColumns = Object.keys(this.reportDataSource[0]);
        this.spinner = false;
        this.isSaveReport = true;
      },
        (error) => (this.error = error)
      );
    });
  }
}
@Component({
  selector: 'savereportdialog',
  templateUrl: 'savereportdialog.component.html',
})
export class SaveReportDialog {
  constructor(
    public dialogRef: MatDialogRef<SaveReportDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
