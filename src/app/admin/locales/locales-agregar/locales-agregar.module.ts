import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalesAgregarPageRoutingModule } from './locales-agregar-routing.module';

import { LocalesAgregarPage } from './locales-agregar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalesAgregarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LocalesAgregarPage]
})
export class LocalesAgregarPageModule {}
