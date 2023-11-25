import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginPage } from '../login/login.page';
import { RegistroPage } from '../registro/registro.page';
import { ProductoUsuarioPage } from '../producto-user/producto-usuario/producto-usuario.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { ProducdetailPage } from '../producto-user/producdetail/producdetail.page';
import { VerperfilPage } from '../perfil/verperfil/verperfil.page';
import { CarritoPage } from '../carro/carrito/carrito.page';
import { FacturaPage } from '../factura/factura.page';
import { NgxPayPalModule } from 'ngx-paypal';



@NgModule({
  declarations: [
    LoginPage,
    RegistroPage,
    ProductoUsuarioPage,
    ProducdetailPage,
    VerperfilPage,
    CarritoPage,
    FacturaPage
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    NgxPayPalModule
  ]
})
export class UserModule { }
