import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadosAgregarPage } from './empleados-agregar.page';

const routes: Routes = [
  {
    path: '',
    component: EmpleadosAgregarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadosAgregarPageRoutingModule {}
