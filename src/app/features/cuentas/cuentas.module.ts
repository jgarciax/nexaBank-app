import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentasRoutingModule } from './cuentas-routing.module';
import { CuentasListComponent } from './pages/cuentas-list/cuentas-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CuentasListComponent
  ],
  imports: [
    CommonModule,
    CuentasRoutingModule,
    FormsModule
  ]
})
export class CuentasModule { }
