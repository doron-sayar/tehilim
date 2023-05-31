import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.page.html',
  styleUrls: ['./delete-account.page.scss'],
})
export class DeleteAccountPage implements OnInit {
 private uid=localStorage.getItem('UID')
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {
  }

  deleteAccount(){
    console.log(this.uid)
    this.http.get('https://alpine.pairsite.com/tehilim/delete-account.php?uid='+this.uid).toPromise().then((data) => {
      localStorage.removeItem('UID')
      localStorage.removeItem('email')
      localStorage.removeItem("display_others")
      localStorage.removeItem("font_range")

      this.router.navigateByUrl('/home',{replaceUrl:true});
    })
  }
}
