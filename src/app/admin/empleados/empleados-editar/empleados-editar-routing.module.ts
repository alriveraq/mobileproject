import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadosEditarPage } from './empleados-editar.page';

const routes: Routes = [
  {
    path: '',
    component: EmpleadosEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadosEditarPageRoutingModule {}
