import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-recover',
  templateUrl: 'recover.html',
})
export class RecoverPage {
  toast: any;

  @ViewChild('email') email;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public afAuth: AngularFireAuth) {
    this.toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});
  }

  recover() {
    this.afAuth.auth.sendPasswordResetEmail(this.email.value)
    .then(data => {
      this.toast.setMessage('Foi enviado um email para recover sua senha!');
      this.toast.present();

      this.navCtrl.pop();
    })
    .catch((error: any) => {
      let _message = '';

      if (error.code == 'auth/invalid-email') {
        _message = 'E-mail inválido!';
      } else if (error.code == 'auth/user-not-found') {
        _message = 'E-mail não localizado';
      } else {
        _message = 'Aconteceu algum erro inexperado, tente novamente mais tarde!';
      }

      this.toast.setMessage(_message);
      this.toast.present();
    })
  }
}
