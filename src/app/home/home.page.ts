//import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ModalController,NavParams } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';
import { ModalRegisterPage} from '../modal-register/modal-register.page';
//import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
//import { getAuth, onAuthStateChanged } from "firebase/auth";
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
  public isLogged: boolean;
  public str_array!:string[];
  public str_ptr_array!:string[];
  public str_pointer:string;
  public selected_category:string;
  public jsonCategories:any;
  public str_names:string;
  public names_count:number;
  public id_array:number[];
  public dedicate: string;
  private display_shared:string;
  private font_range:number;
  public font_size:number;
  public fresh_flag:boolean;
  public msg:string;
  
  constructor(private http: HttpClient,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    //private auth:AuthService,
    private router:Router,
    private socialSharing:SocialSharing
    ) {
      console.log("LOCAL UID="+localStorage.getItem('UID'))
      if (localStorage.getItem('UID')==null){
        console.log('NULL UID! registering...')
        this.showModalRegister();
        /*
        //register new UID
        this.http.get('https://alpine.pairsite.com/tehilim/register.php').toPromise().then((data) => {
        this.uid=data[0].uid
        console.log('new UID='+this.uid)
        localStorage.setItem('UID',this.uid)
        })
        //init values
        localStorage.setItem("display_others","false")
        localStorage.setItem("font_range","2")*/
      }
      this.uid=localStorage.getItem('UID')
      this.display_shared=localStorage.getItem("display_others")
      this.font_range=Number(localStorage.getItem("font_range"))
      this.font_size=1.2+0.1*this.font_range
    
      this.verses=[];
      this.str_ptr_array=[];
      this.http.get('https://alpine.pairsite.com/tehilim/get_categories.php').toPromise().then((data) => {
        this.jsonCategories=data;
    })
    this.fresh_flag=true;
    this.msg=
      'היי חברים, אתם מוזמנים להצטרף אלי לקריאת 15 פסוקי תהלים *ממוקדים והמסוגלים* לאריכות ימים, בריאות, שמחה, פרנסה, זיווג, ובכל נושא שתבחרו...'+
      '%0D%0A'+
      'בעזרת השם נעשה ונצליח.'+
      '%0D%0A%0D%0A'+
      'להורדת האפליקציה:'+
      '%0D%0A'+
      'אנדרויד-'+
      '%0D%0A'+
      'https://bit.ly/tehilim-memukad-android-app'+
      '%0D%0A%0D%0A'+
      'אייפון-'+
      '%0D%0A'+
      'https://tehilim-2b2b0.web.app/home'+
      '%0D%0A%0D%0A'
  }

  ngOnInit() {
    //this.getVerses();
  }
  
  getVerses(showModal:boolean) {
    this.fresh_flag=false; //hide welcome message
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
        console.log('#NAMES='+this.names_count)
        this.namesString=this.jsonNames[0].fullname;
        for (var i=1;i<this.names_count;i++){
          this.namesString+=", "+this.jsonNames[i].fullname
        }
        console.log("first name="+this.namesString)
    })
    if(showModal){
      this.showModal();
    }
  }

  showModal(){
    this.modalCtrl.create({
      component: ModalComponent,
      componentProps: {category:this.selected_category}
    }).then(modalres=>{
      modalres.present();
    })
  }
  
  showModalRegister(){
    this.modalCtrl.create({
      component: ModalRegisterPage,
      backdropDismiss:false,
      componentProps: {category:this.selected_category},
      breakpoints:[0.85],
      initialBreakpoint:0.85
    }).then(modalres=>{
      modalres.present();
    })
  }
  
  logOut(){
    localStorage.removeItem('UID')
    //this.router.navigateByUrl('/',{replaceUrl:true})
    window.location.reload()
  }

async shareViaWhatsApp() {
    // Check if sharing is supported
  //this.socialSharing.canShareVia('whatsapp').then(() => {
    this.socialSharing.shareViaWhatsApp(
      'היי חברים, אתם מוזמנים להצטרף אלי לקריאת תהילים יומית, 15 פסוקים, המתמקדים בסגולה ל-בריאות הגוף. בע"ה נעשה ונצליח.'+
      '\n\nלהורדת האפליקציה:'+
      '\n\nאנדרויד-'+
      '\nhttp://bit.ly/Tehilim_Memokad'+
      '\n\nאייפון-'+
      '\nhttp://bit.ly/Tehilim_Memokad','https://alpine.pairsite.com/tehilim/img/tehilim-memukad.jpeg').then(() => {
      //success
    }).catch(()=>{
      this.presentAlert('לא ניתן לשתף כעת!');
    })
//}).catch(() => {
//  this.presentAlert('לא ניתן לשתף כעת!');
//});
}
async presentAlert(msg:string) {
  const alert = await this.alertCtrl.create({
    header: 'Alert',
    subHeader: 'Important message',
    message: msg,
    buttons: ['OK'],
  });

  await alert.present();
}

handleRefresh(event) {
  setTimeout(() => {
    // Any calls to load data go here
    if (this.selected_category!=undefined){
      this.getVerses(false)
    }
    event.target.complete();
  }, 2000);
}

}
