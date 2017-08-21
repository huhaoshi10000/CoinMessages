import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RedditDataProvider } from '../../providers/reddit-data/reddit-data';
import { ItemDetailPage } from '../item-detail/item-detail';
import { Settings } from '../../providers/settings';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { MainPage } from '../../pages/pages';


@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  cardItems: any[];
  settingPara: any;
  url: string;

  constructor(public platform:Platform, public navCtrl: NavController, public redditService: RedditDataProvider, public settings: Settings, public storage: Storage) {
    this.init();
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

      this.storage.get("settingChanged")
      .then(value => {
        if (value === "DontNeedData") {
            this.storage.get("jpushRecieved")
              .then(value2 => {
                    if (value2 === "DontNeedData") {                            //use current data
                      this.storage.get("currentData").then((card) => {
                          this.cardItems = card;
                          setTimeout(() => {
                            refresher.complete();
                          }, 800);
                      }); 
                        
                    }
                    else {                                                          //require new data
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
                              this.storage.set("currentData", this.cardItems);
                              this.storage.set("settingChanged", "DontNeedData");
                              this.storage.set("jpushRecieved", "DontNeedData");
                              refresher.complete();
                                      
                            });
                     }
                          });

            }
            else {                                                          //require new data
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
                              this.storage.set("currentData", this.cardItems);
                              this.storage.set("settingChanged", "DontNeedData");
                              this.storage.set("jpushRecieved", "DontNeedData");
                              refresher.complete();
                                      
                            });
                     }


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
