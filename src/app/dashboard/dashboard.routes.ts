import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from '../components/order-list/order-list.component';
// import { OrderItemComponent } from '../components/order-item/order-item.component';
import { AuthGuard } from '../_helpers';
// import { OrdDetailsComponent } from './order-item/ord-details/ord-details.component';
// import { OrderRelatedComponent } from './order-item/ord-related/ord-related.component';
// import { OpportunityListComponent } from './opportunity-list/opportunitylist.component';
// import { AccountListComponent } from './account/account-list.component';
// import { OpportunityComponent } from './opportunity/opportunity.component';
// import { DetailsComponent } from './opportunity/details/details.component';
// import { RelatedComponent } from './opportunity/related/related.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'order-list'},
  { path:'order-list', component: OrderListComponent, canActivate: [AuthGuard]},
  // { path:'order-item/:id', component: OrderItemComponent,
  // children: [  
  //   {path:'', pathMatch:'full', redirectTo:'ord-details'},
  //   { path:'ord-details/:id', component: OrdDetailsComponent},
  //   { path:'ord-related/:id', component: OrderRelatedComponent}  
  // ] 
  // },
  // { path:'opportunitylist', component: OpportunityListComponent },
  // { path:'account-list', component: AccountListComponent },
  // { path:'opportunity/:oppId', component: OpportunityComponent,
  //   children: [            
  //             {path:'', pathMatch:'full', redirectTo:'det'},
  //             { path:'det/:oppId', component: DetailsComponent},
  //             { path:'rel/:oppId', component: RelatedComponent}            
  //           ]
  //   },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }