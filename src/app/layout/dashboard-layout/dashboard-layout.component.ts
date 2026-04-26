import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  standalone: false,
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent {
  isSidebarCollapsed = false; 
  isMobileOpen = false;        
  isMobile = window.innerWidth < 768;
  toggleMobile() { this.isMobileOpen = !this.isMobileOpen; }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) this.isMobileOpen = false;
  }

  toggleDesktop() { this.isSidebarCollapsed = !this.isSidebarCollapsed; }
  openMobile()    { this.isMobileOpen = true; }
  closeMobile()   { this.isMobileOpen = false; }
}

