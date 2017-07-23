import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Locker } from './locker';

@NgModule({
  declarations: [
    Locker,
  ],
  imports: [
    IonicPageModule.forChild(Locker),
  ],
  exports: [
    Locker
  ]
})
export class LockerModule {}
