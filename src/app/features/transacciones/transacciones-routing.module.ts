import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialComponent } from './pages/historial/historial.component';
import { TransaccionFormComponent } from './pages/transaccion-form/transaccion-form.component';

const routes: Routes = [
  { path: '', component: HistorialComponent },
  { path: 'nuevo', component: TransaccionFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransaccionesRoutingModule { }
