import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JPush } from 'ionic3-jpush';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the JpushSettingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-jpush-setting',
  templateUrl: 'jpush-setting.html',
})
export class JpushSettingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private jpush: JPush, private storage: Storage) {
    this.storage.get('receivePush').then(setting=>{
      this.receivePush = setting;
      console.log(this.receivePush);
    });
  }
  public pushConfigs = "接受推送通知";
  public receivePush;

  ionViewDidLoad() {
    console.log('ionViewDidLoad JpushSettingPage');
    //to set jpush alias for testing
    // this.jpush.setAlias('nan');
        
  }

  setReceive(){
    console.log(this.receivePush);
    this.storage.set('receivePush', this.receivePush);
    if(!this.receivePush){
      this.jpush.stopPush();
    }
    else{
      this.jpush.resumePush();
    }
  }
}
