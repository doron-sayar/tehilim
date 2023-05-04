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
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  /*{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },*/
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
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
