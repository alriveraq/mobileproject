import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleAdminRoutingModule } from './module-admin-routing.module';
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
import { SubcategoriaPage } from './subcategorias/subcategoria/subcategoria.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
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
    SubcategoriaPage
  ],
  imports: [
    CommonModule,
    ModuleAdminRoutingModule,
    ReactiveFormsModule,
    IonicModule,
    FormsModule,
    ComponentsModule
  ]
})
export class ModuleAdminModule { }
