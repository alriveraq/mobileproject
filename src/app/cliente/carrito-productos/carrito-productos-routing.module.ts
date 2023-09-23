import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarritoProductosPage } from './carrito-productos.page';

const routes: Routes = [
  {
    path: '',
    component: CarritoProductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarritoProductosPageRoutingModule {}
