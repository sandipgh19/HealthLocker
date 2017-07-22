import { Component,ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Profile } from '../pages/profile/profile';
import { Locker } from '../pages/locker/locker';
import { Storage } from '@ionic/storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  email: any;
  sidePage:any = Locker;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage) {
    platform.ready().then(() => {

      this.setRootPage();
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });
  }

  go_to_profile(Page){
    this.nav.setRoot(Profile);
  }
 
  go_to_locker(){
    this.nav.setRoot(Locker);  
  }

  logout() {
    this.storage.remove("email");
    this.storage.remove("name");
    this.nav.setRoot(HomePage);
  }

setRootPage() {
  this.storage.get('name').then((val) => {
    if(val) {
      
        this.rootPage = Locker;
    } else {
        this.rootPage = HomePage;
    }

  });
   
}
 
  
}

