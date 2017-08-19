import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContatInfoPage } from './contat-info';

@NgModule({
  declarations: [
    ContatInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ContatInfoPage),
  ],
})
export class ContatInfoPageModule {}
