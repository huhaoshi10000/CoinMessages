import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RedditDataProvider } from '../../providers/reddit-data/reddit-data';

@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  cardItems: any[];

  constructor(public navCtrl: NavController, public redditService: RedditDataProvider) {
    this.init();
  }

  doRefresh(refresher) {
   
    var url = 'http://120.27.15.227:3389/api/getNews?identity=1&number=10';
    this.redditService.getRemoteData(url).subscribe(
                data => {
                    this.cardItems = data.posts;
                    console.log(data);
                    refresher.complete();
                }
    );
  }

  init() {
    var url = 'http://120.27.15.227:3389/api/getNews?identity=1&number=10';
    this.redditService.getRemoteData(url).subscribe(
                data => {
                    this.cardItems = data.posts;
                }
    );
  }
  
}
