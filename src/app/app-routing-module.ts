import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'clientes',
        loadChildren: () =>
          import('./features/clientes/clientes.module').then(m => m.ClientesModule),
      },
      {
        path: 'cuentas',
        loadChildren: () =>
          import('./features/cuentas/cuentas.module').then(m => m.CuentasModule),
      },
      {
        path: 'transacciones',
        loadChildren: () =>
          import('./features/transacciones/transacciones.module').then(m => m.TransaccionesModule),
      },
      {
        path: '',
        redirectTo: 'clientes',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
