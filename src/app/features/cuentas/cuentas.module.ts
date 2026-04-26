import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentasRoutingModule } from './cuentas-routing.module';
import { CuentasListComponent } from './pages/cuentas-list/cuentas-list.component';

@NgModule({
  declarations: [
    CuentasListComponent
  ],
  imports: [
    CommonModule,
    CuentasRoutingModule
  ]
})
export class CuentasModule { }
