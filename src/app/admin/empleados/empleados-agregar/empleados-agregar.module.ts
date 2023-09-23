import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadosAgregarPageRoutingModule } from './empleados-agregar-routing.module';

import { EmpleadosAgregarPage } from './empleados-agregar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpleadosAgregarPageRoutingModule
  ],
  declarations: [EmpleadosAgregarPage]
})
export class EmpleadosAgregarPageModule {}
