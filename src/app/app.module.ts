import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// Import angular-fusioncharts
import { FusionChartsModule } from 'angular-fusioncharts';
// Import FusionCharts library
import * as FusionCharts from 'fusioncharts';
// Load FusionCharts Individual Charts
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { OrderService } from './_services/order.service';
import { CommonService } from './_services/common.service';
import { RoleManagementService } from './_services/rolemanagement.service';
import { fakeBackendProvider } from './_helpers';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OpportunityComponent } from './components/opportunity/opportunity.component';
import { OpportunityListComponent } from './components/opportunity-list/opportunitylist.component';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { RelatedComponent } from './components/opportunity/related/related.component';
import { DetailsComponent } from './components/opportunity/details/details.component';
import { OrdDetailsComponent } from './components/order-item/ord-details/ord-details.component';
import { OrderRelatedComponent } from './components/order-item/ord-related/ord-related.component';
import { AccountListComponent } from './components/account/account-list.component';
import { OpportunityHeaderComponent } from './components/opportunitydetails/opportunityhead.component';
import { OrderHeaderComponent } from './components/orderheaddetails/orderhead.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { AccdetailsComponent } from './components/account-details/accdetails/accdetails.component';
import { AccrelatedComponent } from './components/account-details/accrelated/accrelated.component';
import { AccountheadComponent } from './components/accountheaddetails/accounthead.component';
import { AppComponent } from './app.component';
import { AdminModule } from './admin';
import { CreatePwdComponent } from './components/createpwd/createpwd.component';
import { DashboardHomeComponent } from './dashboard/dashboardhome/dashboardhome.component';
import { TableHeaderCamelCase } from './custompipes/camelcase'
import { UploadUsageCSVComponent } from './components/uploadusagecsv/uploadusagecsv.component';
import { UploadService } from './_services/upload.service';
import { CasesComponent } from './components/account-details/cases/cases.component';
import { InvoiceModaldialogComponent } from './components/order-item/ord-related/invoice-modaldialog.component';
// import { DndModule } from 'ngx-drag-drop';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AddTaskComponent } from './components/accountheaddetails/add-task.component';
import { EditorModule } from "@tinymce/tinymce-angular";
import { TouchPointComponent } from './components/accountheaddetails/touch-point.component';

FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    OrderListComponent,
    OrderItemComponent,
    OpportunityComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    DetailsComponent,
    OpportunityListComponent,
    RelatedComponent,
    OrdDetailsComponent,
    OrderRelatedComponent,
    OpportunityHeaderComponent,
    OrderHeaderComponent,
    AccountListComponent,
    AccountDetailsComponent,
    AccdetailsComponent,
    AccrelatedComponent,
    AccountheadComponent,
    CreatePwdComponent,
    DashboardHomeComponent,
    TableHeaderCamelCase,
    UploadUsageCSVComponent,
    CasesComponent,
    InvoiceModaldialogComponent,
    AddTaskComponent,
    TouchPointComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FusionChartsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatGridListModule,
    AppRoutingModule,
    AdminModule,
    // DndModule,
    //ClassicEditor,
    EditorModule
  ],
  providers: [
    OrderService,
    CommonService,
    CurrencyPipe,
    UploadService,
    RoleManagementService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
