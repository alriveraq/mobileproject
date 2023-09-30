import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProvedoresAgregarPage } from './provedores-agregar.page';

const routes: Routes = [
  {
    path: '',
    component: ProvedoresAgregarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProvedoresAgregarPageRoutingModule {}
