import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdminRoutingModule } from './admin.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { NewprofileFormdialogComponent } from './newprofile-formdialog/newprofile-formdialog.component';
import { FormdialogComponent } from './newuser-formdialog/formdialog.component';
import { DndModule } from 'ngx-drag-drop';
import { ColumnHeaderCamelCase } from './columnheaderpipe'
import {
  UserListComponent,
  ProfileListComponent,
  ViewsListComponent,
  CreateViewComponent,
} from './pages';
import { ReportsComponent, ReportDialogComponent } from '../admin/pages/reports/reports.component'
import { NewReportComponent, SaveReportDialog } from '../admin/pages/new-report/new-report.component'
@NgModule({
  declarations: [
    NewprofileFormdialogComponent,
    FormdialogComponent,
    UserListComponent,
    ProfileListComponent,
    ViewsListComponent,
    CreateViewComponent,
    ReportsComponent,
    ReportDialogComponent,
    NewReportComponent,
    SaveReportDialog,
    ColumnHeaderCamelCase,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DndModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    NewprofileFormdialogComponent,
    FormdialogComponent,
    UserListComponent,
    ProfileListComponent,
    ViewsListComponent,
    CreateViewComponent,
    ReportsComponent,
    ReportDialogComponent,
    NewReportComponent,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule { }
