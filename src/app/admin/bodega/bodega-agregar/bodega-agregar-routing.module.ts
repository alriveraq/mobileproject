import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BodegaAgregarPage } from './bodega-agregar.page';

const routes: Routes = [
  {
    path: '',
    component: BodegaAgregarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodegaAgregarPageRoutingModule {}
