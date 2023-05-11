import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {AlertController,LoadingController} from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.page.html',
  styleUrls: ['./modal-register.page.scss'],
})
export class ModalRegisterPage implements OnInit {
  public credentials:any;
  public email:string;
  private uid:string;

  constructor(
    private fb:FormBuilder,
    private loadingController:LoadingController,
    private alertController:AlertController,
    private modalCtrl:ModalController,
    private http:HttpClient
  ) { }

  ngOnInit() {
    this.credentials=this.fb.group({
      email: ['',[Validators.required,Validators.email]]
    });
  }
  register(){
    console.log('EMAIL='+this.email)
    //register new UID
    this.http.get('https://alpine.pairsite.com/tehilim/register.php?email='+this.email).toPromise().then((data) => {
      this.uid=data[0].uid
      console.log('new UID='+this.uid)
      localStorage.setItem('UID',this.uid)
      localStorage.setItem('email',this.email)
      })
      //init values
      localStorage.setItem("display_others","false")
      localStorage.setItem("font_range","2")
    this.modalCtrl.dismiss();
  }
}
