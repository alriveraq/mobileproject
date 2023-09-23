import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoAgregarPageRoutingModule } from './producto-agregar-routing.module';

import { ProductoAgregarPage } from './producto-agregar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoAgregarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProductoAgregarPage]
})
export class ProductoAgregarPageModule {}
