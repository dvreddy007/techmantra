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
import { ReportsComponent } from '../admin/pages/reports/reports.component'
import { ReportModalDialogComponent } from '../admin/pages/reports/report-modaldialog.component'
import { NewReportComponent, SaveReportDialog } from '../admin/pages/new-report/new-report.component';
import { RolemanagementComponent, AddRoleComponent, EditRoleComponent, DeleteRoleComponent } from '../admin/pages/rolemanagement/rolemanagement.component';
import { CreateroleComponent } from './pages/createrole/createrole.component';

@NgModule({
  declarations: [
    NewprofileFormdialogComponent,
    FormdialogComponent,
    UserListComponent,
    ProfileListComponent,
    ViewsListComponent,
    CreateViewComponent,
    ReportsComponent,
    ReportModalDialogComponent,
    NewReportComponent,
    SaveReportDialog,
    ColumnHeaderCamelCase,
    RolemanagementComponent,
    AddRoleComponent,
    EditRoleComponent,
    DeleteRoleComponent,
    CreateroleComponent,
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
    ReportModalDialogComponent,
    NewReportComponent,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule { }
