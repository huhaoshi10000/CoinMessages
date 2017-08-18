import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailPage } from '../item-detail/item-detail';

import { Item } from '../../models/item';

import { Items } from '../../providers/providers';

import { Settings } from '../../providers/settings';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  
  currentItems: any = [];

  settingValue : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items, public settings: Settings) { }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
  }

  settingPara : string;
  press() {
  this.settings.load().then((data) => {
    console.log(data);
    this.settingPara = "";
    for (var key in data) {
        if (key === "list")
          continue;
        if (data[key])
          this.settingPara = this.settingPara + "1";
        else 
          this.settingPara = this.settingPara + "0";
    }
    console.log(this.settingPara);
    console.log(parseInt(this.settingPara,2));
  });

  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

}
