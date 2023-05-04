import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-add-name',
  templateUrl: './add-name.component.html',
  styleUrls: ['./add-name.component.scss'],
})
export class AddNameComponent implements OnInit {
public add_name:string;
private uid:string;
private cat_id:string;
name=new UntypedFormControl('');
  constructor(private modalCtrl:ModalController,
              private params:NavParams) {
    this.uid=params.get('uid');
    this.cat_id=params.get('cat_id');
    
   }

  ngOnInit() {}

  dismissModal(){
    this.modalCtrl.dismiss();
  }
  submitForm(){
    console.log(this.name.value);
    this.dismissModal();
  }
}