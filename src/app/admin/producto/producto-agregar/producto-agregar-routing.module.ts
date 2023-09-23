import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductoAgregarPage } from './producto-agregar.page';

const routes: Routes = [
  {
    path: '',
    component: ProductoAgregarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoAgregarPageRoutingModule {}
