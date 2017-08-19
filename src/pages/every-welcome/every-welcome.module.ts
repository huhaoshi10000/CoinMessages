import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EveryWelcomePage } from './every-welcome';

@NgModule({
  declarations: [
    EveryWelcomePage,
  ],
  imports: [
    IonicPageModule.forChild(EveryWelcomePage),
  ],
})
export class EveryWelcomePageModule {}
