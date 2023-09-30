import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BodegaAgregarPageRoutingModule } from './bodega-agregar-routing.module';

import { BodegaAgregarPage } from './bodega-agregar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BodegaAgregarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BodegaAgregarPage]
})
export class BodegaAgregarPageModule {}
