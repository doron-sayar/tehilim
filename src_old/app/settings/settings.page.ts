import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RangeCustomEvent } from '@ionic/angular';
import { RangeValue } from '@ionic/core';
import { last } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public jsonCategories:any;
  private uid:string;
  public display_others:boolean;
  public is_checked:any;
  public fontRange:String;
  lastEmittedValue: RangeValue;
  
  constructor(private http:HttpClient) {
    //init value for share names
    if(localStorage.getItem("display_others")==null){
      localStorage.setItem("display_others","false")
    }
    this.is_checked=localStorage.getItem("display_others")
    
    //init value for font size
    if (localStorage.getItem("font_range")==null){
      localStorage.setItem("font_range","2")
    }
    this.fontRange=localStorage.getItem("font_range")
   }
  
  ngOnInit(): void {
    
  }

  updateDisplayOthers(){
    localStorage.setItem("display_others",this.is_checked.toString())
}
  updateFontRange(ev: Event) {
    this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
    localStorage.setItem("font_range",this.lastEmittedValue.toString())
  }
}