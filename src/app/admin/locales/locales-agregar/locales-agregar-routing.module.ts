import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalesAgregarPage } from './locales-agregar.page';

const routes: Routes = [
  {
    path: '',
    component: LocalesAgregarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalesAgregarPageRoutingModule {}
