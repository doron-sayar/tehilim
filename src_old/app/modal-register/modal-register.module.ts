import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalRegisterPageRoutingModule } from './modal-register-routing.module';

import { ModalRegisterPage } from './modal-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalRegisterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalRegisterPage]
})
export class ModalRegisterPageModule {}
