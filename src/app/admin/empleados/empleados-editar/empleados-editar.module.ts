import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadosEditarPageRoutingModule } from './empleados-editar-routing.module';

import { EmpleadosEditarPage } from './empleados-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpleadosEditarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EmpleadosEditarPage]
})
export class EmpleadosEditarPageModule {}
