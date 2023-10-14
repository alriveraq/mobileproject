import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleAdminRoutingModule } from './module-admin-routing.module';
import { BodegaPage } from './bodega/bodega/bodega.page';
import { BodegaAgregarPage } from './bodega/bodega-agregar/bodega-agregar.page';
import { BodegaEditarPage } from './bodega/bodega-editar/bodega-editar.page';
import { CategoriaPage } from './categorias/categoria/categoria.page';
import { CategoriaAgregarPage } from './categorias/categoria-agregar/categoria-agregar.page';
import { CategoriaEditarPage } from './categorias/categoria-editar/categoria-editar.page';
import { EmpleadosPage } from './empleados/empleados/empleados.page';
import { EmpleadosAgregarPage } from './empleados/empleados-agregar/empleados-agregar.page';
import { EmpleadosEditarPage } from './empleados/empleados-editar/empleados-editar.page';
import { LocalesPage } from './locales/locales/locales.page';
import { LocalesAgregarPage } from './locales/locales-agregar/locales-agregar.page';
import { LocalesEditarPage } from './locales/locales-editar/locales-editar.page';
import { PrincipalPage } from './principal/principal.page';
import { ProductoPage } from './producto/producto/producto.page';
import { ProductoAgregarPage } from './producto/producto-agregar/producto-agregar.page';
import { ProductoEditarPage } from './producto/producto-editar/producto-editar.page';
import { ProvedoresPage } from './provedores/provedores/provedores.page';
import { ProvedoresAgregarPage } from './provedores/provedores-agregar/provedores-agregar.page';
import { ProvedoresEditarPage } from './provedores/provedores-editar/provedores-editar.page';
import { SubcategoriaPage } from './subcategorias/subcategoria/subcategoria.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    BodegaPage,
    BodegaAgregarPage,
    BodegaEditarPage,
    CategoriaPage,
    CategoriaAgregarPage,
    CategoriaEditarPage,
    EmpleadosPage,
    EmpleadosAgregarPage,
    EmpleadosEditarPage,
    LocalesPage,
    LocalesAgregarPage,
    LocalesEditarPage,
    PrincipalPage,
    ProductoPage,
    ProductoAgregarPage,
    ProductoEditarPage,
    ProvedoresPage,
    ProvedoresAgregarPage,
    ProvedoresEditarPage,
    SubcategoriaPage
  ],
  imports: [
    CommonModule,
    ModuleAdminRoutingModule,
    ReactiveFormsModule,
    IonicModule,
    FormsModule
  ]
})
export class ModuleAdminModule { }
