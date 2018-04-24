import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { PostPage } from '../post/post';

import { AngularFireAuth } from 'angularfire2/auth';
import { WordpressService } from '../../services/wordpress.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  toast: any;

  posts: Array<any> = new Array<any>();
  morePagesAvailable: boolean = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afAuth: AngularFireAuth,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public wordpressSrc: WordpressService) {
    this.toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});


  }

  ionViewWillEnter() {
    this.morePagesAvailable = true;

    if (!(this.posts.length > 0)) {
      let _loading = this.loadingCtrl.create();
      _loading.present();

      this.wordpressSrc.getRecentPosts()
      .subscribe(posts => {
        for(let _post of posts) {
          _post.excerpt.rendered = _post.excerpt.rendered.split('<a')[0] + '<p>';

          this.posts.push(_post);
        }
        _loading.dismiss();
      });
    }
  }

  logout() {
    this.afAuth.auth.signOut();

    this.toast.setMessage('Deslogado com sucesso!');
    this.toast.present()

    this.navCtrl.setRoot(LoginPage);
  }

  postTapped(event, post) {
    this.navCtrl.push(PostPage, {item: post});
  }

  doInfinite(infiniteScroll) {
    let _page = (Math.ceil(this.posts.length/10)) + 1;
    let _loading = true;

    this.wordpressSrc.getRecentPosts(_page)
    .subscribe(posts => {
      for (let _post of posts) {
        if (!_loading) {
          infiniteScroll.complete();
        }

        this.posts.push(_post);
        _loading = false;
      }
    }, err => {
      this.morePagesAvailable = false;
    })
  }

  doRefresh(refresher) {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
}
