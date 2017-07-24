import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController, NavParams } from 'ionic-angular';
import { File, Camera } from 'ionic-native';
import { AppSettings } from '../../AppSettings/AppSettings';
import { Locker } from '../locker/locker';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { UUID } from 'angular2-uuid';
import { Storage } from '@ionic/storage';
import { FormControl, FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

declare var cordova: any; 

@Component({
  selector: 'page-newpost',
  templateUrl: 'newpost.html'
})
export class Newpost {
  postTitle: any;
  desc: any;
  imageChosen: any = 0;
  imagePath: any;
  imagePath1: any;
  imagePath2: any;
  imageNewPath: any;
  category: any;
  uuid: any;
  email: any;
  name: any;
  imageslide: any = 0;
  imageslide1: any = 0;
  buttonDisabled: any;
  uploadForm: any;
  imageChosen1: any = 0;
  imageChosen2: any = 0;
  second: any = 0;
  third: any = 0;
  choose: any="No";
  count: any = 0;
  imageNewPath1: any;
  imageNewPath2: any;
  image12: any;
  f: any = 0;

  constructor(public navCtrl: NavController,
    public actionSheet: ActionSheetController,
    private loadingCtrl: LoadingController, public navParams: NavParams, private transfer: Transfer,
    private storage: Storage, public _form:FormBuilder) {

    this.uploadForm = this._form.group({

      "title":["",Validators.required],
      "desc":[""]

    })

    

  }

  ionViewDidLoad() {
      this.category = this.navParams.get('param1');

      this.storage.get('email').then((val) => {
      this.email = val;
    });

    this.storage.get('name').then((val) => {
      this.name = val;
    });

    this.f = 0;

    
  }

  secondImage() {

    this.second = 1;
    this.imageslide = 0;
  }

  thirdImage() {

    this.third = 1;
    this.imageslide1 = 0;
  }


  uploadPhoto() {

    if(this.choose==="Yes") {
    let i=0;
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    for(i=0;i<this.count;i++) {
    if(i==0) {
      this.image12 = this.imageNewPath;
    } else if(i==1) {
      this.image12 = this.imageNewPath1;
    } else if(i==2) {
        this.image12 =this.imageNewPath2;
    }
    this.uuid = UUID.UUID();
    this.uuid = this.uuid+'.jpg';

    /*let loader;

    if(this.f==0){

      loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    }*/
  
   
    let filename = this.imagePath.split('/').pop();


    let options: FileUploadOptions = {
         fileKey: 'file',
         fileName: this.uuid,
         headers: {},
         params: {title: this.postTitle,
                  description: this.desc,
                  category: this.category,
                  email: this.email,
                  name: this.name}
      
      }

    const fileTransfer: TransferObject = this.transfer.create();

    fileTransfer.upload(this.image12, "https://sandipgh19.000webhostapp.com/kolkataproject/sendImage.php",
      options).then(entry => {
       
        loader.dismiss();
        if(i===this.count) {

          if(this.f==0) {
            alert("Upload Successfully");
            loader.dismiss();
            this.f=1;
            this.navCtrl.pop();
            
          }
          
        }
        
      }, (err) => {
        alert(JSON.stringify(err));
      });
      }
      } else {
        alert("Please select a picture for upload");
      }
      
  }

  chooseImage() {

    let actionSheet = this.actionSheet.create({
      title: 'Choose Picture Source',
      buttons: [
        {
          text: 'Gallery',
          icon: 'albums',
          handler: () => {
            this.actionHandler(1);
          }
        },
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.actionHandler(2);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  chooseImage2() {

    let actionSheet = this.actionSheet.create({
      title: 'Choose Picture Source',
      buttons: [
        {
          text: 'Gallery',
          icon: 'albums',
          handler: () => {
            this.actionHandler2(1);
          }
        },
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.actionHandler2(2);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  chooseImage1() {

    let actionSheet = this.actionSheet.create({
      title: 'Choose Picture Source',
      buttons: [
        {
          text: 'Gallery',
          icon: 'albums',
          handler: () => {
            this.actionHandler1(1);
          }
        },
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.actionHandler1(2);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }


  //}

  actionHandler(selection: any) {
    var options: any;

    if (selection == 1) {
      options = {
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: false
      };
    } else {
      options = {
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: false
      };
    }

    Camera.getPicture(options).then((imgUrl) => {

      var sourceDirectory = imgUrl.substring(0, imgUrl.lastIndexOf('/') + 1);
      var sourceFileName = imgUrl.substring(imgUrl.lastIndexOf('/') + 1, imgUrl.length);
      sourceFileName = sourceFileName.split('?').shift();
      File.copyFile(sourceDirectory, sourceFileName, cordova.file.externalApplicationStorageDirectory, sourceFileName).then((result: any) => {
        this.imagePath = imgUrl;
        this.imageChosen = 1;
        this.imageslide = 1;
        this.choose = "Yes";
        this.count = 1;
        this.imageNewPath = result.nativeURL;
        //alert(this.imageNewPath1);

      }, (err) => {
        alert(JSON.stringify(err));
      })

    }, (err) => {
      alert(JSON.stringify(err))
    });

  }

  actionHandler1(selection: any) {
    var options: any;

    if (selection == 1) {
      options = {
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: false
      };
    } else {
      options = {
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: false
      };
    }

    Camera.getPicture(options).then((imgUrl) => {

      var sourceDirectory = imgUrl.substring(0, imgUrl.lastIndexOf('/') + 1);
      var sourceFileName = imgUrl.substring(imgUrl.lastIndexOf('/') + 1, imgUrl.length);
      sourceFileName = sourceFileName.split('?').shift();
      File.copyFile(sourceDirectory, sourceFileName, cordova.file.externalApplicationStorageDirectory, sourceFileName).then((result: any) => {
        this.imagePath1 = imgUrl;
        this.imageChosen1 = 1;
        this.imageslide1 = 1;
        this.count = 2;
        this.imageNewPath1 = result.nativeURL;

      }, (err) => {
        alert(JSON.stringify(err));
      })

    }, (err) => {
      alert(JSON.stringify(err))
    });

  }

  actionHandler2(selection: any) {
    var options: any;

    if (selection == 1) {
      options = {
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: false
      };
    } else {
      options = {
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: false
      };
    }

    Camera.getPicture(options).then((imgUrl) => {

      var sourceDirectory = imgUrl.substring(0, imgUrl.lastIndexOf('/') + 1);
      var sourceFileName = imgUrl.substring(imgUrl.lastIndexOf('/') + 1, imgUrl.length);
      sourceFileName = sourceFileName.split('?').shift();
      File.copyFile(sourceDirectory, sourceFileName, cordova.file.externalApplicationStorageDirectory, sourceFileName).then((result: any) => {
        this.imagePath2 = imgUrl;
        this.imageChosen2 = 1;
        this.count = 3;
        this.imageNewPath2 = result.nativeURL;

      }, (err) => {
        alert(JSON.stringify(err));
      })

    }, (err) => {
      alert(JSON.stringify(err))
    });

  }
  
}
