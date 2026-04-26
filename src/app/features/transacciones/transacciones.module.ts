import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TransaccionesRoutingModule } from './transacciones-routing.module';
import { HistorialComponent } from './pages/historial/historial.component';
import { TransaccionFormComponent } from './pages/transaccion-form/transaccion-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    HistorialComponent,
    TransaccionFormComponent
  ],
  imports: [
    CommonModule,
    TransaccionesRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
  ]
})
export class TransaccionesModule { }
