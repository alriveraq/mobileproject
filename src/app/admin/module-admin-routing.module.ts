import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { SubcategoriaAgregarPage } from './subcategorias/subcategoria-agregar/subcategoria-agregar.page';
import { SubcategoriaEditarPage } from './subcategorias/subcategoria-editar/subcategoria-editar.page';



const routes: Routes = [
  {
    path: 'principal',
    component: PrincipalPage,
  },
      {
        path: 'categoria',
        component: CategoriaPage
      },
      {
        path: 'categoria-agregar',
        component: CategoriaAgregarPage
      },
      {
        path: 'categoria-editar/:id',
        component: CategoriaEditarPage
      },
      {
        path: 'empleados',
        component: EmpleadosPage
      },
      {
        path: 'empleados-agregar',
        component: EmpleadosAgregarPage
      },
      {
        path: 'empleados-editar/:id',
        component: EmpleadosEditarPage
      },
      {
        path: 'locales',
        component: LocalesPage
      },
      {
        path: 'locales-agregar',
        component: LocalesAgregarPage
      },
      {
        path: 'locales-editar/:id',
        component: LocalesEditarPage
      },
      {
        path: 'producto',
        component: ProductoPage
      },
      {
        path: 'producto-agregar',
        component: ProductoAgregarPage
      },
      {
        path: 'producto-editar/:id',
        component: ProductoEditarPage
      },
      {
        path: 'subcategoria',
        component: SubcategoriaPage
      },
      {
        path: 'subcategoria-agregar',
        component: SubcategoriaAgregarPage
      },
      {
        path: 'subcategoria-editar/:id',
        component: SubcategoriaEditarPage
      }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleAdminRoutingModule { }
