import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AlertController,LoadingController} from '@ionic/angular';
// import { validators } from '@ionic/cli-framework';
import { dismiss } from '@ionic/core/dist/types/utils/overlays';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public credentials:any;
  public email:string;

  constructor(
    private fb:FormBuilder,
    private loadingController:LoadingController,
    private alertController:AlertController,
    private authService: AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    this.credentials=this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    });
  }

  async register(){
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      const user=await this.authService.register(this.credentials.value);
      

      if(user){
        this.router.navigateByUrl('/home',{replaceUrl:true});
      }else{
        this.showAlert('Registration failed','Please try again');
      }
    }catch{
      this.showAlert('הרשמה נכשלה','כתובת אימייל כבר נמצאת בשימוש');
    }
    await loading.dismiss();
  }

  async login(){
    console.log(this.credentials.value)
    const loading = await this.loadingController.create();
    await loading.present();

    try{
      const user=await this.authService.login(this.credentials.value);
      if(user){
      this.router.navigateByUrl('/home',{replaceUrl:true});
    }else{
      console.log('LOGIN FAILED!')
      this.showAlert('Login failed','Please try again');
    }
    }catch{
      this.showAlert('כניסה נכשלה','אנא נסה שוב');
    }
    await loading.dismiss();
  }

  async showAlert(header: string,message: string){
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
