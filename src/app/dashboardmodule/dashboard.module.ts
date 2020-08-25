
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SidebarComponent} from '../components/sidebar/sidebar.component';
import{MaterialModule} from '../material.module';
import{DashboardModuleComponent} from './dashboardmodule.component'
import {DashboardModuleRoutes} from './dashboardmodule.routings'

@NgModule({
  imports: [     
    CommonModule, 
    FormsModule,
    RouterModule.forChild(DashboardModuleRoutes),
    ReactiveFormsModule,
    MaterialModule   
  ],
  declarations: [SidebarComponent, DashboardModuleComponent],
  entryComponents:[],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})

export class DashboardLayoutModule {}