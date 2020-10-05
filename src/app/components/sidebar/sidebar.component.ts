import { Component, OnInit, HostBinding } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
   animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ],
    ),
    ]
})
export class SidebarComponent implements OnInit {
expanded: boolean;
managementexpanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded
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
  onItemSelected(type) {
      if (type === 'management') {
        this.managementexpanded = !this.managementexpanded
      } else {
        this.expanded = !this.expanded;
      }
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
