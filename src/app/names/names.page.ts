import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { DialogPage } from '../dialog/dialog.page';

@Component({
  selector: 'app-names',
  templateUrl: './names.page.html',
  styleUrls: ['./names.page.scss'],
})
export class NamesPage implements OnInit {

  public jsonNames:any;
  private uid:string;
  public cat_id:string;
  public categoryName: string;
  handlerMessage = '';
  roleMessage = '';

  constructor(private activatedRoute:ActivatedRoute, 
              private http:HttpClient, 
              private router:Router,
              private alertController:AlertController,
              private modalCtrl:ModalController) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('catID') || (!localStorage.getItem('isLogged'))) {
        //redirect
        this.router.navigate(['/home']);
        return;
      }
      this.cat_id = paramMap.get('catID');
      this.uid=localStorage.getItem('uid');
      
      //get category name for the header
      this.http.get('https://alpine.pairsite.com/tehilim/get_category_by_id.php?cat_id='+this.cat_id).toPromise().then((data) => {
        this.categoryName=data[0].category_name;
        console.log(this.categoryName);
      })

      this.http.get('https://alpine.pairsite.com/tehilim/get_my_names.php?uid='+this.uid+'&cat_id='+this.cat_id).toPromise().then((data) => {
        this.jsonNames=data;
        console.log(this.jsonNames);
      })
    });
    
   }

  ngOnInit() {
  }
  async presentAlertConfirmDelete(id:number) {
    const alert = await this.alertController.create({
      header: 'למחוק מהרשימה?',
      buttons: [
        {
          text: 'בטל',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
            window.location.reload();
          },
        },
        {
          text: 'מחק',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
            this.http.get('https://alpine.pairsite.com/tehilim/remove_name.php?id='+id).toPromise().then((data) => {
              this.jsonNames=data;
              window.location.reload();
            })
            
          },
        },
      ],
    });

    await alert.present();
    
    //const { role } = await alert.onDidDismiss();
    //this.roleMessage = `Dismissed with role: ${role}`;
  }

  async presentAlertToggleShare(id:number, isShared:number) {
    const alert = await this.alertController.create({
      header: isShared==1?"להסיר שיתוף?":"לשתף שם?",
      buttons: [
        {
          text: 'בטל',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
            window.location.reload();
          },
        },
        {
          text: 'אשר',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
            console.log(this.uid);
            console.log(this.cat_id);
            this.http.get('https://alpine.pairsite.com/tehilim/toggle_share.php'
                            +'?id='+id).toPromise().then((data) => {
              this.jsonNames=data;
              window.location.reload();
            })
            
          },
        },
      ],
    });

    await alert.present();
    
    //const { role } = await alert.onDidDismiss();
    //this.roleMessage = `Dismissed with role: ${role}`;
  }

  async showDialog(){
    const modal: HTMLIonModalElement =
    await this.modalCtrl.create({
      component: DialogPage,
      componentProps: {
        uid:this.uid,
        cat_id:this.cat_id
      }
    });
    
    modal.onDidDismiss().then(() => {
      window.location.reload();
    });
    await modal.present();
    //.then(modalres=>{
    //  modalres.present();
    //});

  }
  
  logOut(){

  }
}
