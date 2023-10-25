import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from '../login/login.page';
import { RegistroPage } from '../registro/registro.page';

const routes: Routes = [
  {
  path: 'login',
  component: LoginPage,
  },
  {
    path: 'registro',
    component: RegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
