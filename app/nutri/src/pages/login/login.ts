import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { RegisterPage } from '../register/register';
import { RecoverPage } from '../recover/recover';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';


import { Users } from '../../class/users';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  toast: any;

  user: Users = new Users();

  @ViewChild('email') email;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public afAuth: AngularFireAuth) {

    this.toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});
  }

  entrar() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
    .then(data => {
      this.user.email = this.email.value;
      this.user.password = this.password.value;

      this.navCtrl.setRoot(ProfilePage);
    })
    .catch((error: any) => {
      let _message = '';

      if (error.code == 'auth/invalid-email') {
        _message = 'E-mail inválido!';
      } else if (error.code == 'auth/user-disabled') {
        _message = 'E-mail foi desabilitado!';
      } else if (error.code == 'auth/user-not-found' || error.code == 'auth/wrong-password') {
        _message = 'E-mail e/ou Senha inválido(s)!';
      }

      this.toast.setMessage(_message);
      this.toast.present();
    })
  }

  register() {
    this.navCtrl.push(RegisterPage)
  }

  recover() {
    this.navCtrl.push(RecoverPage)
  }

  entrarComFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(data => {
      this.navCtrl.setRoot(ProfilePage);
    })
    .catch((error: any) => {
      this.toast.setMessage('Erro ao logar com o Facebook');
      this.toast.present();
    })
  }
}
