import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from '../login/login.page';
import { RegistroPage } from '../registro/registro.page';
import { ProductoUsuarioPage } from '../producto-user/producto-usuario/producto-usuario.page';
import { ProducdetailPage } from '../producto-user/producdetail/producdetail.page';
import { VerperfilPage } from '../perfil/verperfil/verperfil.page';
import { EditarperfilPage } from '../perfil/editarperfil/editarperfil.page';

const routes: Routes = [
  {
  path: 'login',
  component: LoginPage,
  },
  {
    path: 'registro',
    component: RegistroPage
  },
  {
    path: 'productos',
    component: ProductoUsuarioPage
  },
  {
    path: 'productodetail/:id',
    component: ProducdetailPage
  },
  {
    path: 'perfil/:id',
    component: VerperfilPage
  },
  {
    path: 'editarperfil/:id',
    component: EditarperfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
