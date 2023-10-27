import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/module-admin.module').then( m => m.ModuleAdminModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/user/user.module').then( m => m.UserModule)
  },





  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
