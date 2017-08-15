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
  }

  doRefresh(refresher) {
    this.redditService.getRemoteData().subscribe(
                data => {
                    this.cardItems = data.posts;
                    console.log(data);
                    refresher.complete();
                }
    );

  }
  
}
