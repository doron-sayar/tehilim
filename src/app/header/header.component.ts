import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
//import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isLogged:String;
  private current_url:string;
  public header_title:string;
  public icon_home:string;
  public icon_checkmark:string;
  public icon_checkmark_done:string;
  public icon_folder1:string;
  public icon_folder2:string;
  public invoice_num:string;

  constructor(private router:Router) { //public afAuth:AngularFireAuth) {
    this.isLogged=localStorage.getItem('isLogged');
    this.current_url=this.router.url.replace('/','');
    console.log('url='+this.current_url);
   }

  ngOnInit() {}
  logOut() {
    //this.isLogged = false;
    localStorage.removeItem('isLogged');
    localStorage.removeItem('email');
    //this.verses=[];
    //this.selected_category=null;
    //this.afAuth.signOut();
  }
}
