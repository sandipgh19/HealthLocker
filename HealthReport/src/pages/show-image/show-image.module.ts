import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowImage } from './show-image';

@NgModule({
  declarations: [
    ShowImage,
  ],
  imports: [
    IonicPageModule.forChild(ShowImage),
  ],
  exports: [
    ShowImage
  ]
})
export class ShowImageModule {}
