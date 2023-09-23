import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaAgregarPageRoutingModule } from './categoria-agregar-routing.module';

import { CategoriaAgregarPage } from './categoria-agregar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaAgregarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CategoriaAgregarPage]
})
export class CategoriaAgregarPageModule {}
