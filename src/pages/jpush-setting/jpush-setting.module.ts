import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JpushSettingPage } from './jpush-setting';

@NgModule({
  declarations: [
    JpushSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(JpushSettingPage),
  ],
})
export class JpushSettingPageModule {}
