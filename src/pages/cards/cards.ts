import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { RedditDataProvider } from '../../providers/reddit-data/reddit-data';
import { ItemDetailPage } from '../item-detail/item-detail';
import { Settings } from '../../providers/settings';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { MainPage } from '../../pages/pages';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';


@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  cardItems: any[];
  settingPara: any;
  url: string;

  constructor(private toastCtrl:ToastController, private auth:Auth, public platform:Platform, public navCtrl: NavController, public redditService: RedditDataProvider, public settings: Settings, public storage: Storage) {
    this.init();
    this.authOnStart();
    document.addEventListener("jpush.receiveNotification", () => {
        storage.set("jpushRecieved", "NeedData");
        this.init();
      }, false);
    this.backButtonToMainPage();
  }

  backButtonToMainPage(){
    this.platform.registerBackButtonAction(()=>{
      console.log('do nothing');
    },0)
  }

  authOnStart() {
    this.storage.get('loginDetails').then((detail) => {
      // console.log(detail);
      this.auth.login('basic', detail).then(() => {
        let toast = this.toastCtrl.create({
          message: '登陆成功',
          duration: 3000,          
          position: 'top'                 
        });
        toast.present();
      }, (err) => {
        console.log(err.message);
        let errors = '';
        if (err.message === 'UNPROCESSABLE ENTITY') errors += 'Email isn\'t valid.<br/>';
        if (err.message === 'UNAUTHORIZED') errors += 'Password is required.<br/>';
      });
    })
  }

  ionViewDidEnter() {
    this.storage.get("settingChanged")
      .then(value => {
        if (value === "NeedData") {
          this.init();
        }
      });

      this.storage.get("jpushRecieved")
      .then(value => {
        if (value === "NeedData") {
          this.init(); 
        }
      });
    
  }

  init() {
      this.storage.set("skipTutorial", "89757");
      this.settings.load().then((data) => {
      this.settingPara = null;
      for (var key in data) {
          if (key === "list")
            continue;
          if (data[key]) {
              this.settingPara = this.settingPara + "1";
              console.log(key);
          }       
         else 
            this.settingPara = this.settingPara + "0";
      }
      if (this.settingPara == null) {
        this.settingPara = "16383";
      } else {
        console.log(parseInt(this.settingPara.split("").reverse().join(""),2));
        this.settingPara = parseInt(this.settingPara.split("").reverse().join(""),2);
      }
        
     
      
      console.log(this.settingPara);
      this.url = 'http://139.224.112.58:3389/api/getNews?identity=' + this.settingPara + '&number=20';
      this.redditService.getRemoteData(this.url).subscribe(
                data => {
                console.log(data.posts);
                    this.cardItems = data.posts;
                    for (let i in this.cardItems) {
                    if (this.cardItems[i].website.code === "BA")
                       this.cardItems[i].website.logo = "assets/web-icon/" + this.cardItems[i].website.code + ".svg";
                    else
                       this.cardItems[i].website.logo = "assets/web-icon/" + this.cardItems[i].website.code + ".png";
                    }
                    this.storage.set("currentData", this.cardItems);
                    this.storage.set("settingChanged", "DontNeedData");
                    this.storage.set("jpushRecieved", "DontNeedData");
                }
      
    );
    });
    }
  

  doRefresh(refresher) {

     this.settings.load().then((data) => {
      this.settingPara = "";
      for (var key in data) {
          if (key === "list")
            continue;
          if (data[key]) {
              this.settingPara = this.settingPara + "1";
              console.log(key);
          }       
         else 
            this.settingPara = this.settingPara + "0";
      }
      console.log(parseInt(this.settingPara.split("").reverse().join(""),2));
      this.settingPara = parseInt(this.settingPara.split("").reverse().join(""),2);
      
      this.url = 'http://139.224.112.58:3389/api/getNews?identity=' + this.settingPara + '&number=20';

                                                          //require new data
         this.redditService.getRemoteData1(this.url, refresher).subscribe(
            data => {
            console.log(data.posts);
            this.cardItems = data.posts;
            for (let i in this.cardItems) {
              if (this.cardItems[i].website.code === "BA")
                this.cardItems[i].website.logo = "assets/web-icon/" + this.cardItems[i].website.code + ".svg";
              else
                this.cardItems[i].website.logo = "assets/web-icon/" + this.cardItems[i].website.code + ".png";
            } 
              console.log(refresher);
              this.storage.set("currentData", this.cardItems);
              this.storage.set("settingChanged", "DontNeedData");
              this.storage.set("jpushRecieved", "DontNeedData");
              refresher.complete();    
                                                
           });
      });
  }



    openItem(item){
        this.navCtrl.push(ItemDetailPage, {
            item: item
        });
    }

    deleteItem(item){
        this.cardItems.splice(this.cardItems.indexOf(item), 1);
    }

  
}
