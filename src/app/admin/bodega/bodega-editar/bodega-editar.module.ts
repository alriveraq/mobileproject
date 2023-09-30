import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BodegaEditarPageRoutingModule } from './bodega-editar-routing.module';

import { BodegaEditarPage } from './bodega-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BodegaEditarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BodegaEditarPage]
})
export class BodegaEditarPageModule {}
