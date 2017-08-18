import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingHomePage } from './setting-home';

@NgModule({
  declarations: [
    SettingHomePage,
  ],
  imports: [
    IonicPageModule.forChild(SettingHomePage),
  ],
})
export class SettingHomePageModule {}
