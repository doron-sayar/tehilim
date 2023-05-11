import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {redirectLoggedInTo,
        redirectUnauthorizedTo,
        canActivate} from '@angular/fire/auth-guard'; 

const redirectLoggedInToHome=()=>redirectLoggedInTo(['home']);
const redirectUnauthorizedToLogin=()=>redirectUnauthorizedTo(['']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'names/:catID',
    loadChildren: () => import('./names/names.module').then( m => m.NamesPageModule)
  },
  {
    path: 'dialog',
    loadChildren: () => import('./dialog/dialog.module').then( m => m.DialogPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'modal-register',
    loadChildren: () => import('./modal-register/modal-register.module').then( m => m.ModalRegisterPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
