import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShowImage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-show-image',
  templateUrl: 'show-image.html',
})
export class ShowImage {

	imagepath: any;
	image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowImage');
    console.log(this.navParams.get('param1'));

    this.imagepath = this.navParams.get('param1');

    this.image = '<img src="'+ this.imagepath + '"/>'
  }

}
