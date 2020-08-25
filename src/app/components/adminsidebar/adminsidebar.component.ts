import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/order-list', title:'User Management',  icon: 'view_module', class: '' },
    { path: '/user-profile', title: 'Profile Management',  icon:'bubble_chart', class: '' },
    { path: '/table-list', title: 'View Management',  icon:'dashboard', class: '' }  
];

@Component({
  selector: 'app-adminsidebar',
  templateUrl: './adminsidebar.component.html',
  styleUrls: ['./adminsidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  menuItems: any[];

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
