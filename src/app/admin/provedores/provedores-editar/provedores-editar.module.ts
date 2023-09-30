import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProvedoresEditarPageRoutingModule } from './provedores-editar-routing.module';

import { ProvedoresEditarPage } from './provedores-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProvedoresEditarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProvedoresEditarPage]
})
export class ProvedoresEditarPageModule {}
