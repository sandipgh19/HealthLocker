import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Register } from '../pages/register/register';
import { Locker } from '../pages/locker/locker';
import { Profile } from '../pages/profile/profile';
import { Details } from '../pages/details/details';
import { Upload } from '../pages/upload/upload';
import { Newpost } from '../pages/newpost/newpost';
import { ShowImage } from '../pages/show-image/show-image';
import { PostService } from '../providers/post-service';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Register,
    Locker,
    Profile,
    Details,
    Upload,
    Newpost,
    ShowImage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Register,
    Locker,
    Profile,
    Details,
    Upload,
    Newpost,
    ShowImage
  ],
  providers: [
    StatusBar,
    Transfer,
    Camera,
    SocialSharing,
    SplashScreen,
    PostService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
