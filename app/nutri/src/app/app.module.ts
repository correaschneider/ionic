import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { RecoverPage } from '../pages/recover/recover';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { PostPage } from '../pages/post/post';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { HttpModule } from '@angular/http';
import { WordpressService } from '../services/wordpress.service';

const firebaseConfig = {
  apiKey: "AIzaSyAKWe52lOB3C00Qz571mMqwidCokfbGcUY",
  authDomain: "nutri-586bb.firebaseapp.com",
  databaseURL: "https://nutri-586bb.firebaseio.com",
  projectId: "nutri-586bb",
  storageBucket: "nutri-586bb.appspot.com",
  messagingSenderId: "662128296795"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    RecoverPage,
    HomePage,
    ProfilePage,
    PostPage
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    RecoverPage,
    HomePage,
    ProfilePage,
    PostPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WordpressService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
