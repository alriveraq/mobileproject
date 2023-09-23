import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalesEditarPageRoutingModule } from './locales-editar-routing.module';

import { LocalesEditarPage } from './locales-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalesEditarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LocalesEditarPage]
})
export class LocalesEditarPageModule {}
