import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { MainPage } from '../pages';
/**
 * Generated class for the EveryWelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-every-welcome',
  templateUrl: 'every-welcome.html',
})
export class EveryWelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private auth : Auth) {
    this.authOnStart();
  }



  authOnStart() {
    this.storage.get('loginDetails').then((detail) => {
      // console.log(detail);
      this.auth.login('basic', detail).then(() => {
        setTimeout(()=> {
          this.navCtrl.push(MainPage);
        }, 1000);
      }, (err) => {
        console.log(err.message);
        let errors = '';
        if (err.message === 'UNPROCESSABLE ENTITY') errors += 'Email isn\'t valid.<br/>';
        if (err.message === 'UNAUTHORIZED') errors += 'Password is required.<br/>';
      });
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EveryWelcomePage');
  }

}
