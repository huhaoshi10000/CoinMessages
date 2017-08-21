import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JPush } from 'ionic3-jpush';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private jpush: JPush) {
  }
  public pushConfigs = "接受推送通知";
  receivePush = true;

  ionViewDidLoad() {
    console.log('ionViewDidLoad JpushSettingPage');
  }

  setReceive(){
    console.log(this.receivePush);
    if(!this.receivePush){
      this.jpush.stopPush();
    }
    else{
      this.jpush.resumePush();
    }
  }
}
