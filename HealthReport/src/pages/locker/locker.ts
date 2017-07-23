import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { Details } from '../details/details';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the Locker page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-locker',
  templateUrl: 'locker.html',
})
export class Locker {
  clickOn: any;
  email: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private menu: MenuController,
  private storage: Storage) {

  this.menu.enable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Locker');

    this.storage.get('email').then((val) => {
      this.email = val;
    });

  }

  DetailsPage1() {
    console.log(this.clickOn);
    this.navCtrl.push(Details, {
        param1: 'prescription',
        email: this.email
    });
  }

  DetailsPage2() {
    console.log(this.clickOn);
    this.navCtrl.push(Details, {
        param1: 'reports',
        email: this.email
    });
  }

  DetailsPage3() {
    console.log(this.clickOn);
    this.navCtrl.push(Details, {
        param1: 'bills',
        email: this.email
    });
  }

  DetailsPage4() {
    console.log(this.clickOn);
    this.navCtrl.push(Details, {
        param1: 'details',
        email: this.email
    });
  }

}
