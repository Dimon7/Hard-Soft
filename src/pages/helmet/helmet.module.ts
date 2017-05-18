import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelmetPage } from './helmet';

@NgModule({
  declarations: [
    HelmetPage,
  ],
  imports: [
    IonicPageModule.forChild(HelmetPage),
  ],
  exports: [
    HelmetPage
  ]
})
export class HelmetPageModule {}
