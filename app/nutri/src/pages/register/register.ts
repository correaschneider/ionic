import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { HomePage } from '../home/home';

import { AngularFireAuth } from 'angularfire2/auth';

import { Users } from '../../class/users';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  toast: any;

  user: Users = new Users();

  @ViewChild('email') email;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afAuth: AngularFireAuth,
              public toastCtrl: ToastController) {
    this.toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});
  }

  registrar() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
    .then(data => {
      this.user.email = this.email.value;
      this.user.password = this.password.value;

      this.navCtrl.setRoot(HomePage);
    })
    .catch((error: any) => {
      let _message = '';

      if (error.code == 'auth/email-already-in-use') {
      _message = 'E-mail já existente';
      } else if (error.code == 'auth/invalid-email') {
      _message = 'E-mail inválido';
      } else if (error.code == 'auth/operation-not-allowed') {
      _message = 'Erro desconhecido';
      } else if (error.code == 'auth/weak-password') {
      _message = 'Defina uma senha mais forte';
      }

      this.toast.setMessage(_message);
      this.toast.present();
    })
  }
}
