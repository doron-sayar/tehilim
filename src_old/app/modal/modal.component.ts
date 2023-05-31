import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  private selected_category:any;
  public arr_verse:string[];
  private font_range:number;
  public font_size:number;

  constructor(private modalCtrl:ModalController,
    private http:HttpClient,private params:NavParams) {
    this.font_range=Number(localStorage.getItem("font_range"))
    this.font_size=1.2+0.1*this.font_range
    this.arr_verse=[];
    this.selected_category=params.get('category');
    this.http.get('https://alpine.pairsite.com/tehilim/get_intro.php?cat_id='+this.selected_category).toPromise().then((data) => {
        this.arr_verse=data[0].text_before.split(":");
    })
   }

  ngOnInit() {}
  
  dismissModal(){
    this.modalCtrl.dismiss();
  }
}