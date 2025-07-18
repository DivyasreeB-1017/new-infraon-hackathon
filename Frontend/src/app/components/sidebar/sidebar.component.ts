import { Component, Input, OnInit } from '@angular/core';
import { MenuTrackerService } from './services/menu-tracker.service';
import { formatDate } from '@angular/common';

declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() menuItems: any;
othersExpanded: boolean = true;


  constructor(private trackerService: MenuTrackerService) {}


  ngOnInit() {
    // this.getInitilizeMenuOptions()
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  toggleMenu(menuItem: any) {
  menuItem.expanded = !menuItem.expanded;
  }

  onMenuClick(menuItem: any) {
    const user_id = '12345'; // Replace with actual user ID logic
    const menu_id = menuItem.path;
    const time = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US');

    this.trackerService.logMenuClick({ menu_id, user_id, time });

    // Toggle if parent has children
    if (menuItem.children && menuItem.children.length > 0) {
      this.toggleMenu(menuItem);
    }
  }

  getInitilizeMenuOptions() {
    // const user_id = '12345'; // Replace with actual user ID logic
    // const menu_id = menuItem.path;
    // const time = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US');
    this.trackerService.getInitialMenu({ smartgridview: true }).subscribe({
      next: (res) => {
        this.menuItems = res.data[0].menu_config_data;
        console.log('Menu items:', this.menuItems);
      },
      error: (err) => {
        console.error('Error fetching menu data', err);
      }
    });
  }

}
