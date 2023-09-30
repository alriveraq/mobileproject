import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProvedoresAgregarPageRoutingModule } from './provedores-agregar-routing.module';

import { ProvedoresAgregarPage } from './provedores-agregar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProvedoresAgregarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProvedoresAgregarPage]
})
export class ProvedoresAgregarPageModule {}
