import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { RouterModule, RouterOutlet } from "@angular/router";

@NgModule({
  declarations: [SidebarComponent, HeaderComponent, DashboardLayoutComponent],
  imports: [CommonModule, RouterOutlet, RouterModule],
  exports: [SidebarComponent, HeaderComponent, DashboardLayoutComponent],
})
export class LayoutModule {}
