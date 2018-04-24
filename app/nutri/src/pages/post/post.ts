import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { WordpressService } from '../../services/wordpress.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  post: any;
  author: string;
  categories: Array<any> = new Array<any>();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public wordpressSrc: WordpressService,
              public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
    let _loading = this.loadingCtrl.create();
    _loading.present();

    this.post = this.navParams.get('item');

    console.log(this.post)

    Observable.forkJoin(this.getAuthorData(), this.getCategories())
    .subscribe(data => {
      this.author = data[0].name;
      this.categories = data[1];

      _loading.dismiss();
    })

  }

  getAuthorData() {
    return this.wordpressSrc.getAuthor(this.post.author);
  }

  getCategories() {
    return this.wordpressSrc.getPostCategories(this.post);
  }


}
