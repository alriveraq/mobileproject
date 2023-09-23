import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriaAgregarPage } from './categoria-agregar.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriaAgregarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaAgregarPageRoutingModule {}
