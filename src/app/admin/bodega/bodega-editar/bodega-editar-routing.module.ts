import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BodegaEditarPage } from './bodega-editar.page';

const routes: Routes = [
  {
    path: '',
    component: BodegaEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodegaEditarPageRoutingModule {}
