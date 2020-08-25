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
export interface DialogData {
  reportname: string;
  name: string;
}
// import Swal from 'sweetalert2';
@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.css']
})
export class NewReportComponent implements OnInit {
  eHr: string = "";
  myDate;
  // disabled = true;
  actions = ["Last 3months", "Last 6months", "Current FY", "Previous FY", "Previous 2FY"]

  // dateClass = (d: Date): MatCalendarCellCssClasses => {
  //   const date = d.getDate();
  //   return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
  // }

  onDateChange(value) {
    console.log(value)
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


    console.log(this.eHr);
    console.log(this.myDate);

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
  tableSelectedforFields: string = '';
  public selectedDisplayColumns = [];
  public reportGenTableList;
  public reportGenSelectedTableList;
  disabled = false;
  public tablename;
  public accounttablecolumnList;
  public ordertablecolumnList;
  public opportunitytablecolumnList;
  public error;
  public selectedSourceTableColumns;
  public selectedTableColumns = [];
  public columnsSelected = [];
  public reportDisplayColumns = [];
  public newTableObj = [];
  panelOpenState = false;
  isSelected = false;
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
  tablefieldModel: Array<field> = [];

  modelFields: Array<field> = [];
  model: any = {
    attributes: this.modelFields
  };
  report = false;
  reports: any = [];

  constructor(public dialog: MatDialog, private _router: ActivatedRoute,
    private viewService: CommonService) { }

  // getTableColumns(selectedTableObj) {
  //   this.spinner = true;
  //   this.showIcon = !this.showIcon;
  //   this.viewService.getTableColumns(selectedTableObj).subscribe((response) => {
  //     this.tablefieldModel = response;
  //     this.selectedSourceTableColumns = response;
  //     this.selectedDisplayColumns = response;
  //     this.spinner = false;
  //     console.log("The selected source columns are ... " + JSON.stringify(this.selectedDisplayColumns));
  //   },
  //     (error) => (this.error = error)
  //   );
  // }

  getRelatedTables(selectedTable) {
    this.spinner = true;
    this.newTableObj = [];
    this.viewService.getReportTableList(selectedTable).subscribe((response) => {
      this.reportGenSelectedTableList = response;

      console.log('the related tables are ...' + JSON.stringify(this.reportGenSelectedTableList))
      this.reportGenSelectedTableList.forEach((item) => {
        this.viewService.getTableColumns(item).subscribe((response) => {
          this.tablefieldModel = response;
          this.selectedSourceTableColumns = response;
          this.selectedDisplayColumns = response;
          this.spinner = false;
          //newTableObj[item.table_name] = response;
          this.newTableObj.push({ 'tableName': item.table_name, tablefieldModel: response });
          console.log("item is  ... " + JSON.stringify(this.newTableObj));
          console.log("response is ... " + JSON.stringify(this.newTableObj));
        },
          (error) => (this.error = error)
        );
      });
    },
      (error) => (this.error = error)
    );
    console.log("The selected source columns are ... " + JSON.stringify(this.newTableObj));
    // this.viewService.getTableColumnsList(selectedTable).subscribe((response) => {
    //   this.selectedDisplayColumns = response['queryResult'];
    // },
    //   (error) => (this.error = error)
    // );
  }

  selectTableforReport(event: MatCheckboxChange): void {
    console.log(event.checked);
    if (event.checked === true) {
      this.disabled = true;
      this.newTableObj.forEach((item) => {
        this.selectedTableColumns = item.tablefieldModel.filter((item) => item.isSelected === true)
        this.selectedTableColumns.forEach((item) => { console.log(item); this.reportDisplayColumns.push(item.fieldName) })
      })
      // this.newTableObj.filter((item) => { console.log(item.tablefieldModel); this.selectedTableColumns = item.tablefieldModel item.isSelected === true })
      // this.selectedTableColumns.forEach((item) => { console.log(item); this.reportDisplayColumns.push(item.fieldName) })
    }
    // this.selectedTableColumns.forEach((item) => { delete item.isSelected });
    console.log(JSON.stringify(this.selectedTableColumns));
    console.log(JSON.stringify(this.reportDisplayColumns));
  }

  onIcon_opp() {
    this.showIcon_opp = !this.showIcon_opp;
  }

  onDragStart(event: DragEvent) {
    console.log("drag started", JSON.stringify(event, null, 2));
  }

  // onDragStartDisplay(event: DragEvent) {
  //   console.log("drag started", JSON.stringify(event, null, 2));
  // }

  onDragEnd(event: DragEvent) {
    console.log("drag ended", JSON.stringify(event, null, 2));
  }

  onDraggableCopied(event: DragEvent) {
    console.log("draggable copied", JSON.stringify(event, null, 2));
  }

  onDraggableLinked(event: DragEvent) {
    console.log("draggable linked", JSON.stringify(event, null, 2));
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
    console.log("drag cancelled", JSON.stringify(event, null, 2));
  }

  onDragover(event: DragEvent) {
    console.log("dragover", JSON.stringify(event, null, 2));
  }

  onDragoverDisplay(event: DragEvent) {
    console.log("dragover", JSON.stringify(event, null, 2));
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
    console.log("ondragged", JSON.stringify(list));
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
    // Swal({
    //   title: 'Are you sure?',
    //   text: "Do you want to remove this field?",
    //   type: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#00B96F',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, remove!'
    // }).then((result) => {
    //   if (result.value) {
    //     this.model.attributes.splice(i, 1);
    //   }
    // });

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
    // let valid = true;
    // let validationArray = JSON.parse(JSON.stringify(this.model.attributes));
    // validationArray.reverse().forEach(field => {
    //   console.log(field.label + '=>' + field.required + "=>" + field.value);
    //   if (field.required && !field.value && field.type != 'checkbox') {
    //     Swal('Error', 'Please enter ' + field.label, 'error');
    //     valid = false;
    //     return false;
    //   }
    //   if (field.required && field.regex) {
    //     let regex = new RegExp(field.regex);
    //     if (regex.test(field.value) == false) {
    //       Swal('Error', field.errorText, 'error');
    //       valid = false;
    //       return false;
    //     }
    //   }
    //   if (field.required && field.type == 'checkbox') {
    //     if (field.values.filter(r => r.selected).length == 0) {
    //       Swal('Error', 'Please enterrr ' + field.label, 'error');
    //       valid = false;
    //       return false;
    //     }

    //   }
    // });
    // if (!valid) {
    //   return false;
    // }
    // console.log('Save', this.model);
    // let input = new FormData;
    // input.append('formId', this.model._id);
    // input.append('attributes', JSON.stringify(this.model.attributes))
    // this.us.postDataApi('/user/formFill',input).subscribe(r=>{
    //   console.log(r);
    //   Swal('Success','You have contact sucessfully','success');
    //   this.success = true;
    // },error=>{
    //   Swal('Error',error.message,'error');
    // });
  }
  // drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   }
  // }

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
    this.spinner = true;
    this.viewService.getReportTableList(this.selectedTable).subscribe((response) => {
      this.reportGenTableList = response;
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
  generateReportModel(model, selectedTable, isSave, reportName) {
    this.spinner = true;
    let children = this.groupBy(model.attributes, 'tableName');
    console.log(selectedTable);
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
      parent: {
        tableName: selectedTable,
        filters: filters
      },
      children,
      displayColumns: uniqueDisplayColumns
    }

    this.viewService.generateReport(jsontoSubmit).subscribe((response) => {
      this.reportDataSource = response;
      this.displayedColumns = Object.keys(this.reportDataSource[0]);
      this.spinner = false;
      this.isSaveReport = true;
    },
      (error) => (this.error = error)
    );
  }

  saveReportDiaslog(model, selectedTable, isSave, reportName): void {
    const dialogRef = this.dialog.open(SaveReportDialog, {
      width: '25rem',
      height: '15rem',
      data: { name: this.name, reportname: this.reportname }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.reportname = result;
      // this.generateReportModel(model, selectedTable, isSave, this.reportname);
      this.spinner = true;
      let children = this.groupBy(model.attributes, 'tableName');
      console.log(selectedTable);
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
        isSave: isSave,
        reportName: this.reportname,
        parent: {
          tableName: selectedTable,
          filters: filters
        },
        children,
        displayColumns: uniqueDisplayColumns
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
