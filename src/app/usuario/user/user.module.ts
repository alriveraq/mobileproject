import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginPage } from '../login/login.page';
import { RegistroPage } from '../registro/registro.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    LoginPage,
    RegistroPage
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule
  ]
})
export class UserModule { }
