import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/assets', title: 'Assets', icon: 'inventory', class: '' },
  { path: '/contract-management', title: 'Contract Management', icon: 'description', class: '' },
  { path: '/nccm', title: 'NCCM', icon: 'device_hub', class: '' },
  { path: '/ipam', title: 'IPAM', icon: 'dns', class: '' },
  { path: '/ticket', title: 'Ticket', icon: 'confirmation_number', class: '' },
  { path: '/request', title: 'Request', icon: 'assignment', class: '' },
  { path: '/problem', title: 'Problem', icon: 'report_problem', class: '' },
  { path: '/change', title: 'Change', icon: 'change_circle', class: '' },
  { path: '/log-management', title: 'Log Management', icon: 'list_alt', class: '' },
  { path: '/release', title: 'Release', icon: 'rocket_launch', class: '' },
  { path: '/events', title: 'Events', icon: 'event', class: '' },
  { path: '/business-service', title: 'Business Service', icon: 'business_center', class: '' },
  { path: '/reports', title: 'Reports', icon: 'insights', class: '' },
  { path: '/knowledge-base', title: 'Knowledge Base', icon: 'menu_book', class: '' },
  { path: '/geomap', title: 'GeoMap', icon: 'public', class: '' },
  { path: '/networkdiagram', title: 'Network Diagram', icon: 'schema', class: '' },
  { path: '/topology', title: 'Topology', icon: 'language', class: '' }, // Material globe icon
  { path: '/infraon-configuration', title: 'Infraon Configuration', icon: 'settings', class: '' },
  { path: '/Marketplace', title: 'Marketplace', icon: 'storefront', class: '' },
  { path: '/getting-started', title: 'Getting Started', icon: 'play_circle', class: '' }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

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
