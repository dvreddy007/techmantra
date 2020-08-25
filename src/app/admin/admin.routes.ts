import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  UserListComponent,
  ProfileListComponent,
  ViewsListComponent,
  CreateViewComponent,
  ReportsComponent,
} from './pages';
import { NewReportComponent, SaveReportDialog } from '../admin/pages/new-report/new-report.component'
import { from } from 'rxjs';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'userlist' },
  { path: 'userlist', component: UserListComponent },
  { path: 'profilelist', component: ProfileListComponent },
  { path: 'viewslist', component: ViewsListComponent },
  { path: 'createview', component: CreateViewComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'newreport', component: NewReportComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
