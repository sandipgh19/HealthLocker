import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Newpost } from '../newpost/newpost';
import { ShowImage } from '../show-image/show-image';
import { PostService } from '../../providers/post-service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

/**
 * Generated class for the Details page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class Details {
  posts: any;
  category: any;
  email: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private postService: PostService, private loadingCtrl: LoadingController, private socialSharing: SocialSharing, private storage: Storage, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Details');
    this.category = this.navParams.get('param1');
    console.log(this.category);
    
    this.email = this.navParams.get('email');
    console.log(this.email);
  }

  upload() {
  console.log(this.email);
  this.navCtrl.push(Newpost, {
      param1: this.category
  });


  }

  getPosts() {

    let postParams = JSON.stringify({
      category: this.category,
      email: this.email
    });
    let loader = this.loadingCtrl.create({
      content: "Loading Photos..."
    });
    loader.present();
    this.postService.getPosts(postParams).subscribe((val) => {
      this.posts = val.posts;
      console.log(val);
      loader.dismiss();
      
    });
  }

  shareInfo(item){

    this.socialSharing.share("", "", "", item.url).
      then(() => {
      //alert("Sharing success");
      // Success!
      }).catch(() => {
      // Error!
      alert("Share failed");
    });
  }

  deleteItem(item) {
    console.log(item.id);
    let image = item.url;
    image = image.split('/')[5];
    console.log(image);
    let loader = this.loadingCtrl.create({
      content: "Deleteing..."
    });
    loader.present();

 
    let postParams = JSON.stringify({
      id: item.id,
      image: image
    });
    
    this.http.post("https://sandipgh19.000webhostapp.com/kolkataproject/delete.php", postParams).map(res => res.json())
      .subscribe(data => {
        console.log(data['_body']);
        console.log(data);
        loader.dismiss();
        alert(data.message);
        this.getPosts();
       }, error => {
        console.log(error);// Error getting the data
      });
  }
getName() {
    let email1;
    this.storage.get('name').then((name) => {
      console.log('Your name is', name);
      email1 = name;
      console.log(email1);
    });
    console.log(email1);
  }

  onPageDidEnter() {
      // the left menu should be disabled on the login page
      console.log("enter");
      this.getPosts();
  }

  show(item) {
    this.navCtrl.push(ShowImage, {
      param1: item.url
  });

  }


    

  ionViewWillEnter(){
    this.getPosts();
  }

  }
