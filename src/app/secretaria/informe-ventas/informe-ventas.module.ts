import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformeVentasPageRoutingModule } from './informe-ventas-routing.module';

import { InformeVentasPage } from './informe-ventas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformeVentasPageRoutingModule
  ],
  declarations: [InformeVentasPage]
})
export class InformeVentasPageModule {}
