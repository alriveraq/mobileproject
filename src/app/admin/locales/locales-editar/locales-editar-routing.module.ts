import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalesEditarPage } from './locales-editar.page';

const routes: Routes = [
  {
    path: '',
    component: LocalesEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalesEditarPageRoutingModule {}
