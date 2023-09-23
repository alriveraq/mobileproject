import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'categoria',
    loadChildren: () => import('./admin/categorias/categoria/categoria.module').then( m => m.CategoriaPageModule)
  },
  {
    path: 'provedores',
    loadChildren: () => import('./admin/provedores/provedores.module').then( m => m.ProvedoresPageModule)
  },
  {
    path: 'bodegas',
    loadChildren: () => import('./admin/bodegas/bodegas.module').then( m => m.BodegasPageModule)
  },
  {
    path: 'rol',
    loadChildren: () => import('./admin/rol/rol.module').then( m => m.RolPageModule)
  },
  {
    path: 'lista-productos',
    loadChildren: () => import('./cliente/lista-productos/lista-productos.module').then( m => m.ListaProductosPageModule)
  },
  {
    path: 'carrito-productos',
    loadChildren: () => import('./cliente/carrito-productos/carrito-productos.module').then( m => m.CarritoProductosPageModule)
  },
  {
    path: 'retiro',
    loadChildren: () => import('./cliente/retiro/retiro.module').then( m => m.RetiroPageModule)
  },
  {
    path: 'historial-compras',
    loadChildren: () => import('./cliente/historial-compras/historial-compras.module').then( m => m.HistorialComprasPageModule)
  },
  {
    path: 'informe-ventas',
    loadChildren: () => import('./secretaria/informe-ventas/informe-ventas.module').then( m => m.InformeVentasPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./admin/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'categoria-editar/:id',
    loadChildren: () => import('./admin/categorias/categoria-editar/categoria-editar.module').then( m => m.CategoriaEditarPageModule)
  },
  {
    path: 'categoria-agregar',
    loadChildren: () => import('./admin/categorias/categoria-agregar/categoria-agregar.module').then( m => m.CategoriaAgregarPageModule)
  },
  {
    path: 'subcategoria',
    loadChildren: () => import('./admin/subcategorias/subcategoria/subcategoria.module').then( m => m.SubcategoriaPageModule)
  },
  {
    path: 'producto-agregar',
    loadChildren: () => import('./admin/producto/producto-agregar/producto-agregar.module').then( m => m.ProductoAgregarPageModule)
  },
  {
    path: 'producto-editar/:id',
    loadChildren: () => import('./admin/producto/producto-editar/producto-editar.module').then( m => m.ProductoEditarPageModule)
  },
  {
    path: 'producto',
    loadChildren: () => import('./admin/producto/producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'empleados',
    loadChildren: () => import('./admin/empleados/empleados/empleados.module').then( m => m.EmpleadosPageModule)
  },
  {
    path: 'empleados-editar/:id',
    loadChildren: () => import('./admin/empleados/empleados-editar/empleados-editar.module').then( m => m.EmpleadosEditarPageModule)
  },
  {
    path: 'empleados-agregar',
    loadChildren: () => import('./admin/empleados/empleados-agregar/empleados-agregar.module').then( m => m.EmpleadosAgregarPageModule)
  },
  {
    path: 'locales',
    loadChildren: () => import('./admin/locales/locales/locales.module').then( m => m.LocalesPageModule)
  },
  {
    path: 'locales-editar/:id',
    loadChildren: () => import('./admin/locales/locales-editar/locales-editar.module').then( m => m.LocalesEditarPageModule)
  },
  {
    path: 'locales-agregar',
    loadChildren: () => import('./admin/locales/locales-agregar/locales-agregar.module').then( m => m.LocalesAgregarPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
