import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  public jsonCategories:any;
  private uid:string;
  constructor(private http:HttpClient) {
    this.uid=localStorage.getItem('uid');
    this.http.get('https://alpine.pairsite.com/tehilim/get_names_setup.php?uid='+this.uid).toPromise().then((data) => {
        this.jsonCategories=data;
    })
   }

  ngOnInit() {
  }
logOut(){
  
}
}