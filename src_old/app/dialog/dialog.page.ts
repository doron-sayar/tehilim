import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.page.html',
  styleUrls: ['./dialog.page.scss'],
})
export class DialogPage implements OnInit {
public boolShared:boolean;
private isShared:number;
public fullname:string;
private uid:string;
private cat_id:string;
  constructor(private modalCtrl:ModalController, 
              private params:NavParams,
              private http:HttpClient) {
    this.uid=params.get('uid');
    this.cat_id=params.get('cat_id');
    this.boolShared=false; //init
   }

  ngOnInit() {
  }
  dismissModal(){
    this.modalCtrl.dismiss();
  }
  submitForm(){
    this.isShared=this.boolShared?1:0;
    this.http.get('https://alpine.pairsite.com/tehilim/add_name.php'
    +'?uid='+this.uid
    +'&cat_id='+this.cat_id
    +'&fullname='+this.fullname
    +'&shared='+this.isShared).toPromise().then((data) => {
      this.dismissModal();
    })
    console.log(this.fullname);
    console.log("SHARED="+this.isShared);
  }
}
