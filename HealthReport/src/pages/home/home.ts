import { Component } from '@angular/core';
import { NavController, MenuController, LoadingController } from 'ionic-angular';
import { Register } from '../register/register';
import { Locker } from '../locker/locker';
import { FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	public loginForm: any;
  public email: any;
  public password: any;
  public userLog: any;
 
  constructor(public navCtrl: NavController,public _form:FormBuilder,public menu: MenuController, public http: Http, private storage: Storage, private loadingCtrl: LoadingController) {

    this.menu.enable(false);


  this.loginForm = this._form.group({

  		
  		"password":["",Validators.required],
  		"email":["",Validators.compose([Validators.maxLength(30), Validators.pattern('^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$'), Validators.required])]

  	})

  }

  registerPage() {

  this.navCtrl.push(Register)
  this.storage.get('name').then((val) => {
    console.log('Your name is', val);
  });
  }

  lockerPage() {
  let loader = this.loadingCtrl.create({
      content: "Log In..."
    });
    loader.present();
  let postParams = JSON.stringify({
      email: this.email,
      password: this.password
    });
    
    this.http.post("https://sandipgh19.000webhostapp.com/kolkataproject/login.php", postParams).map(res => res.json())
      .subscribe(data => {
        let data1= data['result'];
        let user = data1[0].message;
        console.log(user);
        loader.dismiss();
        if(user==="Success") {

          let name = data1[0].name;
          this.storage.set('name', name);
          this.storage.set('email',this.email);
          this.navCtrl.setRoot(Locker)
          //alert(name);
        } else {
          alert(user);
        }

        
       }, error => {
        console.log(error);// Error getting the data
      });

  }

  onPageDidEnter() {
      // the left menu should be disabled on the login page
      this.menu.enable(false);
  }

  onPageDidLeave() {
      // enable the left menu when leaving the login page
      this.menu.enable(true);
  }


}
