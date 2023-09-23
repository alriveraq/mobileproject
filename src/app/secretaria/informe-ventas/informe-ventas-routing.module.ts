import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformeVentasPage } from './informe-ventas.page';

const routes: Routes = [
  {
    path: '',
    component: InformeVentasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformeVentasPageRoutingModule {}
