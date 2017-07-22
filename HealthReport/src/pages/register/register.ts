import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {

  email: any;
  name: any;
  password: any;

	public registrationForm:any;
  public name1:String;

  constructor(public navCtrl: NavController, public navParams: NavParams,public _form:FormBuilder,public http: Http, private storage: Storage, private loadingCtrl: LoadingController) {

  this.registrationForm = this._form.group({

  		"name":["",Validators.required],
  		"email":["",Validators.compose([Validators.maxLength(30), Validators.pattern('^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$'), Validators.required])],
  		"password":["",Validators.required]

  	})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');

   /* this.storage.get('name').then((val) => {
    console.log('Your name is', val);
  });*/
  }

  register() {
    console.log(this.email);
    let loader = this.loadingCtrl.create({
      content: "Register..."
    });
    loader.present();
 
    let postParams = JSON.stringify({
      name: this.name,
      email: this.email,
      password: this.password
    });
    
    this.http.post("https://sandipgh19.000webhostapp.com/kolkataproject/register.php", postParams).map(res => res.json())
      .subscribe(data => {
        console.log(data['_body']);
        console.log(data.message);
        loader.dismiss();
        alert(data.message);
       }, error => {
        console.log(error);// Error getting the data
      });

  }

}
