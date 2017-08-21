import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SettingHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-setting-home',
  templateUrl: 'setting-home.html',
})
export class SettingHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingHomePage');
  }

  items = [
    'Pokémon Yellow',
    'Super Metroid',
    'Mega Man X',
    'The Legend of Zelda',
    'Pac-Man',
    'Super Mario World',
    'Street Fighter II',
    'Half Life',
    'Final Fantasy VII',
    'Star Fox',
    'Tetris',
    'Donkey Kong III',
    'GoldenEye 007',
    'Doom',
    'Fallout',
    'GTA',
    'Halo'
  ];

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

}
