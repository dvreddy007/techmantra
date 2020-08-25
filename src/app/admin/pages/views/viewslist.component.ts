import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../_services/common.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
export interface PeriodicElement {
  tablename: string;
  viewname: string;
}
/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-viewlist',
  styleUrls: ['viewslist.component.css'],
  templateUrl: 'viewslist.component.html',
})
export class ViewsListComponent implements OnInit {
  constructor(private viewService: CommonService) {}
  displayedColumns: string[] = ['viewname'];
  public sourceColumns;
  public dataSource;
  public error;

  selectedColumns = [{}];
  moveAll(direction: string) {
    console.log(direction);
    if (direction === 'right') {
      this.selectedColumns = [...this.sourceColumns, ...this.selectedColumns];
      this.sourceColumns = [];
    } else {
      this.sourceColumns = [...this.selectedColumns, ...this.sourceColumns];
      this.selectedColumns = [];
    }
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

  items = ['Carrots', 'Tomatoes', 'Onions', 'Apples', 'Avocados'];

  basket = ['Oranges', 'Bananas', 'Cucumbers'];

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
    this.viewService.getViewList().subscribe(
      (response) => (this.dataSource = response['queryResult']),
      (error) => (this.error = error)

    );
    console.log(this.dataSource)

  }

  getTableColumns(val) {
    this.viewService.getTableColumns(val).subscribe(
      (response) => (this.sourceColumns = response['queryResult']),
      (error) => (this.error = error)
    );
    console.log(JSON.stringify(this.dataSource));
  }
}
