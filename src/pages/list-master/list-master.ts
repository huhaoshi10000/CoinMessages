import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { ItemCreatePage } from '../item-create/item-create';
import { ItemDetailPage } from '../item-detail/item-detail';
import {SettingsPage} from '../settings/settings';
import {JpushSettingPage} from '../jpush-setting/jpush-setting'
import {UsermanualPage} from '../usermanual/usermanual'
import {ContatInfoPage} from '../contat-info/contat-info'
import { Platform } from 'ionic-angular';
import { MainPage } from '../../pages/pages';


import { Items } from '../../providers/providers';

import { Item } from '../../models/item';


@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, public platform: Platform) {
    this.currentItems = this.items.query();       
    this.backButtonToMainPage(); 
  }

    
  backButtonToMainPage(){
    this.platform.registerBackButtonAction(()=>{
      this.navCtrl.push(MainPage);
    },0)
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }



  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: string) {
    // this.navCtrl.push(ItemDetailPage, {
    //   item: item
    // });
    switch(item) { 
      case "推送网站设置": { 
        this.navCtrl.push(SettingsPage);
        break;
      } 
      case "推送设置": { 
        this.navCtrl.push(JpushSettingPage);
        break; 
      }
      case "使用手册": { 
        this.navCtrl.push(UsermanualPage);
        break; 
      }  
      case "联系我们": { 
        this.navCtrl.push(ContatInfoPage);
        break; 
      }  
      default: { 
         break; 
      } 
   } 
  }
}
