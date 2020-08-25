import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from './../material.module'
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RelatedComponent } from '../components/opportunity/related/related.component';
import { DetailsComponent } from '../components/opportunity/details/details.component';
import { OpportunityListComponent } from '../components/opportunity-list/opportunitylist.component';
import { OrdDetailsComponent } from './order-item/order-item.component';
import { OrderRelatedComponent } from './order-item/ord-related/ord-related.component';
import { AccountListComponent } from './account/account-list.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccdetailsComponent } from './account-details/accdetails/accdetails.component';
import { AccrelatedComponent } from './account-details/accrelated/accrelated.component';

@NgModule({
  declarations: [DashboardComponent, NavbarComponent, RelatedComponent,
    DetailsComponent, OpportunityListComponent, OrdDetailsComponent, OrderRelatedComponent,
    AccountListComponent, AccountDetailsComponent, AccdetailsComponent, AccrelatedComponent],
  imports: [CommonModule, MaterialModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule { }
