import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OpportunityComponent } from './components/opportunity/opportunity.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AuthGuard } from './_helpers/auth.guard'
import { RelatedComponent } from './components/opportunity/related/related.component';
import { DetailsComponent } from './components/opportunity/details/details.component';
import { OpportunityListComponent } from './components/opportunity-list/opportunitylist.component';
import { OrdDetailsComponent } from './components/order-item/ord-details/ord-details.component';
import { OrderRelatedComponent } from './components/order-item/ord-related/ord-related.component';
import { AccountListComponent } from './components/account/account-list.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { AccdetailsComponent } from './components/account-details/accdetails/accdetails.component';
import { AccrelatedComponent } from './components/account-details/accrelated/accrelated.component';
import { CreatePwdComponent } from './components/createpwd/createpwd.component';
import { DashboardHomeComponent } from './dashboard/dashboardhome/dashboardhome.component';
import { UploadUsageCSVComponent } from './components/uploadusagecsv/uploadusagecsv.component';
import { CasesComponent } from './components/account-details/cases/cases.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboardhome', component: DashboardHomeComponent },
  { path: 'creratepwd', component: CreatePwdComponent },
  { path: 'uploadusagaecsv', component: UploadUsageCSVComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  //{ path: 'admin', component:AdminModuleComponent},
  { path: 'order-list', component: OrderListComponent, canActivate: [AuthGuard] },
  {
    path: 'order-item', component: OrderItemComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'ord-details/id' },
      { path: 'ord-details/:id', component: OrdDetailsComponent },
      { path: 'ord-related/:id', component: OrderRelatedComponent }
    ]
  },
  { path: 'opportunitylist', component: OpportunityListComponent },
  {
    path: 'opportunity', component: OpportunityComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'det/oppId' },
      { path: 'det/:oppId', component: DetailsComponent },
      { path: 'rel/:oppId', component: RelatedComponent }
    ]
  },
  { path: 'account-list', component: AccountListComponent },
  {
    path: 'account-details', component: AccountDetailsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'accdet/accId' },
      { path: 'accdet/:accId', component: AccdetailsComponent },
      { path: 'accrel/:accId', component: AccrelatedComponent },
    ]
  },
  {
    path: 'cases/:accountid', component: CasesComponent
  },
  

  { path: '**', component: PagenotfoundComponent },
];
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }

