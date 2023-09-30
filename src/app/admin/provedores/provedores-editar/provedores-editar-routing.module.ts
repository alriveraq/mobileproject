import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProvedoresEditarPage } from './provedores-editar.page';

const routes: Routes = [
  {
    path: '',
    component: ProvedoresEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProvedoresEditarPageRoutingModule {}
