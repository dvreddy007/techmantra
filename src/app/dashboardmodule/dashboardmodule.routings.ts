import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpportunityListComponent } from '../components/opportunity-list/opportunitylist.component';
import { OrderListComponent } from '../components/order-list/order-list.component';
import { OrderItemComponent } from '../components/order-item/order-item.component';
import { OrdDetailsComponent } from '../components/order-item/ord-details/ord-details.component';
import { OrderRelatedComponent } from '../components/order-item/ord-related/ord-related.component';
import { AccountListComponent } from '../components/account/account-list.component';
import { OpportunityComponent } from '../components/opportunity/opportunity.component';
import { DetailsComponent } from '../components/opportunity/details/details.component';
import { RelatedComponent } from '../components/opportunity/related/related.component';
import { AccountDetailsComponent } from '../components/account-details/account-details.component';
import { AccrelatedComponent } from '../components/account-details/accrelated/accrelated.component';
import { AccdetailsComponent } from '../components/account-details/accdetails/accdetails.component';
import { AuthGuard } from '../_helpers';
import { DashboardModuleComponent } from './dashboardmodule.component';

export const DashboardModuleRoutes: Routes = [ 
        {path:'',pathMatch:'full', redirectTo:'order-list'},  
        {path:'dashboardmodule', component:DashboardModuleComponent},        
        { path:'order-list', component: OrderListComponent, canActivate: [AuthGuard]},
        { path:'order-item/:id',  component: OrderItemComponent,
        children: [  
            {path:'', pathMatch:'full', redirectTo:'ord-details'},
            { path:'ord-details/:id', component: OrdDetailsComponent},
            { path:'ord-related/:id', component: OrderRelatedComponent}  
        ] 
        },
        { path:'opportunitylist',  component: OpportunityListComponent },
        { path:'account-list',  component: AccountListComponent },
        { path:'opportunity/:oppId', component: OpportunityComponent,
            children: [            
                    {path:'', pathMatch:'full', redirectTo:'det'},
                    { path:'det/:oppId', component: DetailsComponent},
                    { path:'rel/:oppId', component: RelatedComponent}            
                    ]
            },
            {path:'account-details/:accId',component:AccountDetailsComponent,
            children:[
                    {path:'', pathMatch:'full', redirectTo:'accdet'},
                    {path:'accdet/:accId',component:AccdetailsComponent},
                    {path:'accrel/:accId',component:AccrelatedComponent},
            ]
        },
    ];
    
  


