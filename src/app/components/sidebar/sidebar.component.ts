import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/order-list', title: 'Tables', icon: 'view_module', class: '' },
  { path: '/user-profile', title: 'Charts', icon: 'bubble_chart', class: '' },
  { path: '/dashboardhome', title: 'Dashboard', icon: 'dashboard', class: '' },
  {
    path: 'admin/userlist',
    title: 'User Management',
    icon: 'supervised_user_circle',
    class: '',
  },
  {
    path: 'admin/profilelist',
    title: 'Profile Management',
    icon: 'people_alt',
    class: '',
  },
  {
    path: 'admin/viewslist',
    title: 'View Management',
    icon: 'preview',
    class: '',
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  public loggedInUserName;
  public isAdmin: boolean = false;
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    if (sessionStorage.getItem('userProfile').replace(/^"(.*)"$/, '$1') === 'ADMIN' || sessionStorage.getItem('userProfile').replace(/^"(.*)"$/, '$1') === 'CSM') {
      this.isAdmin = true;
    }
    this.loggedInUserName = sessionStorage
      .getItem('loggedInUserName')
      .replace(/^"(.*)"$/, '$1');
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
