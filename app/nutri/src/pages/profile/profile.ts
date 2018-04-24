import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  toast: any;

  user = {
    nome: '',
    fotoUrl: '',
    email: ''
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afAuth: AngularFireAuth,
              public toastCtrl: ToastController) {
    this.toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});

    this.user.nome = afAuth.auth.currentUser.displayName;
    this.user.fotoUrl = afAuth.auth.currentUser.photoURL || 'assets/imgs/person.png';
    this.user.email = afAuth.auth.currentUser.email;
  }

  logout() {
    this.afAuth.auth.signOut();

    this.toast.setMessage('Deslogado com sucesso!');
    this.toast.present()

    this.navCtrl.setRoot(LoginPage);
  }
}
