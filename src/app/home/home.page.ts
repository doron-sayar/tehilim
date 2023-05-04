//import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ModalController,NavParams } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public jsonData: any;
  public jsonNames: any;
  public namesString:string;
  public verses: string[][];
  public verse:string;
  public intro:string;
  public boldstr:string;
  private uid: string;
  public userEmail: string;
  public isLogged: boolean;
  public str_array!:string[];
  public str_ptr_array!:string[];
  public str_pointer:string;
  public selected_category:string;
  public jsonCategories:any;
  public str_names:string;
  public names_count:number;
  public id_array:number[];
  public email:string;
  public dedicate: string;
  private display_shared:string;
  private font_range:number;
  public font_size:number;
  
  constructor(private http: HttpClient,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private auth:AuthService,
    private router:Router,
    private socialSharing:SocialSharing
    ) {

      const ga = getAuth();
      onAuthStateChanged(ga, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User

          this.email=user.email;
          console.log("EMAIL="+this.email);
          this.isLogged=true;
          this.http.get('https://alpine.pairsite.com/tehilim/get_uid.php?email='+this.email).toPromise().then((data) => {
          this.uid=data[0].uid;
          console.log('UID='+this.uid);
          localStorage.setItem('isLogged','true');
          localStorage.setItem('email',this.email);
          localStorage.setItem('uid',this.uid);

          //init value for shared names
          if(localStorage.getItem("display_others")==null){
          localStorage.setItem("display_others","false")
          }
          this.display_shared=localStorage.getItem("display_others")

          //init value for font size
          if (localStorage.getItem("font_range")==null){
            localStorage.setItem("font_range","2")
          }
          this.font_range=Number(localStorage.getItem("font_range"))
          this.font_size=1.2+0.1*this.font_range
        })
        } else {
          // User is signed out
          this.email=null;
          localStorage.removeItem('isLogged');
          localStorage.removeItem('email');
          localStorage.removeItem('uid');
        }
      });
    

        
   
    
    this.verses=[];
      this.str_ptr_array=[];
      this.http.get('https://alpine.pairsite.com/tehilim/get_categories.php').toPromise().then((data) => {
        this.jsonCategories=data;
    })
  }

  ngOnInit() {
    //this.getVerses();
  }
  
  getVerses() {
    console.log("selected="+this.selected_category)
    this.verses=[]; //init array
    this.id_array=[]; //init array
    this.names_count=0;
    if (this.selected_category==undefined){
      return null
    }

    this.http.get('https://alpine.pairsite.com/tehilim/get_intro.php?cat_id='+this.selected_category).toPromise().then((data) => {
        this.intro=data[0].text_before;
        this.dedicate=data[0].text_after;
        console.log(this.intro);
    })
    this.http.get('https://alpine.pairsite.com/tehilim/get_verses.php?cat_id='+this.selected_category).toPromise().then((data) => {
      for (let i = 0; i < 15; i++) {
        this.verse=data[i].verse;
        this.verses[i]=[];
        this.id_array[i]=data[i].id;
        this.str_array=this.verse.split(' ');
        this.str_ptr_array[i]=this.str_array[0].replace(',',', ');
        
        //shift right array elements
        for (let j = 1; j < this.str_array.length; j++) {
          this.str_array[j-1]=this.str_array[j];
        }
        this.str_array[this.str_array.length-1]='';
        this.verse=this.str_array.join(' ');

        this.str_array=this.verse.split(':');
        for (let j = 0; j < this.str_array.length; j++) {
          this.verses[i][j]=this.str_array[j];
        }
      }
    })
    
    if(localStorage.getItem("display_others")==null){
      localStorage.setItem("display_others","false")
    }

    this.http.get('https://alpine.pairsite.com/tehilim/get_names.php'+
                  '?uid='+this.uid+
                  '&cat_id='+this.selected_category+
                  '&ds='+this.display_shared).toPromise().then((data) => {
        this.jsonNames=data;
        this.names_count=this.jsonNames.length;
        this.namesString=this.jsonNames[0].fullname;
        for (var i=1;i<this.names_count;i++){
          this.namesString+=", "+this.jsonNames[i].fullname
        }
        console.log("first name="+this.namesString)
    })
    this.showModal();
  }

  showModal(){
    this.modalCtrl.create({
      component: ModalComponent,
      componentProps: {category:this.selected_category}
    }).then(modalres=>{
      modalres.present();
    })
  }
  
  async logOut(){
    await this.auth.logout();
    this.router.navigateByUrl('/',{replaceUrl:true})
  }

 async shareFacebook() {
    this.socialSharing.shareViaFacebook('×”×™×™ ×—×‘×¨×™×, ××ª× ×ž×•×–×ž× ×™× ×œ×”×¦×˜×¨×£ ××œ×™ ×œ×§×¨×™××ª ×ª×”×™×œ×™× ×™×•×ž×™×ª, 14 ×¤×¡×•×§×™×, ×”×ž×ª×ž×§×“×™× ×‘×¡×’×•×œ×” ×œ-×‘×¨×™××•×ª ×”×’×•×£. ×‘×¢"×” × ×¢×©×” ×•× ×¦×œ×™×—.\n\n×œ×”×•×¨×“×ª ×”××¤×œ×™×§×¦×™×”:\n\n×× ×“×¨×•××™×“ - http://bit.ly/Tehilim_Memokad\n\n××™×™×¤×•×Ÿ - https://bit.ly/TehilimMemokad', 'www/assets/share/sunday.png', null).then(() => {
    }).catch(e => {
    });
}

async shareMail() {
    this.socialSharing.shareViaEmail('×”×™×™ ×—×‘×¨×™×, ××ª× ×ž×•×–×ž× ×™× ×œ×”×¦×˜×¨×£ ××œ×™ ×œ×§×¨×™××ª ×ª×”×™×œ×™× ×™×•×ž×™×ª, 14 ×¤×¡×•×§×™×, ×”×ž×ª×ž×§×“×™× ×‘×¡×’×•×œ×” ×œ-×‘×¨×™××•×ª ×”×’×•×£. ×‘×¢"×” × ×¢×©×” ×•× ×¦×œ×™×—.\n\n×œ×”×•×¨×“×ª ×”××¤×œ×™×§×¦×™×”:\n\n×× ×“×¨×•××™×“ - http://bit.ly/Tehilim_Memokad\n\n××™×™×¤×•×Ÿ - https://bit.ly/TehilimMemokad', '×ª×”×™×œ×™× ×œ×‘×¨×™××•×ª ×”×’×•×£ - ×§×¨×™××” ×™×•×ž×™×ª', null, null, null, 'www/assets/share/sunday.png').then(() => {
    }).catch(e => {
    });
}

async shareWhatsApp() {
    this.socialSharing.shareViaWhatsApp('×”×™×™ ×—×‘×¨×™×, ××ª× ×ž×•×–×ž× ×™× ×œ×”×¦×˜×¨×£ ××œ×™ ×œ×§×¨×™××ª ×ª×”×™×œ×™× ×™×•×ž×™×ª, 14 ×¤×¡×•×§×™×, ×”×ž×ª×ž×§×“×™× ×‘×¡×’×•×œ×” ×œ-*×‘×¨×™××•×ª ×”×’×•×£*. ×‘×¢"×” × ×¢×©×” ×•× ×¦×œ×™×—.\n\n×œ×”×•×¨×“×ª ×”××¤×œ×™×§×¦×™×”:\n\n×× ×“×¨×•××™×“ - http://bit.ly/Tehilim_Memokad\n\n××™×™×¤×•×Ÿ - https://bit.ly/TehilimMemokad', 'www/assets/share/sunday.png', null).then(() => {
    }).catch(e => {
    });
}

}
