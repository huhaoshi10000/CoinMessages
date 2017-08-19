import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RedditDataProvider } from '../../providers/reddit-data/reddit-data';
import { ItemDetailPage } from '../item-detail/item-detail';
import { Settings } from '../../providers/settings';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  cardItems: any[];
  settingPara: any;
  url: string;

  constructor(public navCtrl: NavController, public redditService: RedditDataProvider, public settings: Settings, public storage: Storage) {
    this.init();

  }

  ionViewDidEnter() {
      
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
      this.url = 'http://120.27.15.227:3389/api/getNews?identity=' + this.settingPara + '&number=10';
      this.redditService.getRemoteData(this.url).subscribe(
                data => {
                    this.cardItems = data.posts;
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
      this.url = 'http://120.27.15.227:3389/api/getNews?identity=' + this.settingPara + '&number=10';
      this.redditService.getRemoteData(this.url).subscribe(
                data => {
                    this.cardItems = data.posts;
                    console.log(data);
                    refresher.complete();
                }
    );
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
