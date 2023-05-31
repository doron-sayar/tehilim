import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
//import { HeaderComponent } from '../header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesPageRoutingModule,
  ],
  declarations: [
    SettingsPage,
    //HeaderComponent
  ]
})
export class SettingsPageModule {}
