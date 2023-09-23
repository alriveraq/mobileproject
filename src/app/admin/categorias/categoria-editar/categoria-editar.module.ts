import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaEditarPageRoutingModule } from './categoria-editar-routing.module';

import { CategoriaEditarPage } from './categoria-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CategoriaEditarPageRoutingModule
  ],
  declarations: [CategoriaEditarPage]
})
export class CategoriaEditarPageModule {}
