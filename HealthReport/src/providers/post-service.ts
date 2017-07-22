import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { postData } from '../models/posts';
import { AppSettings } from '../AppSettings/AppSettings';

/*
  Generated class for the PostService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PostService {
	posts: any;
  constructor(public http: Http) {
    console.log('Hello PostService Provider');
  }

  getPosts(postParams) {
    return this.http.post(AppSettings.API_ENDPOINT,postParams)
      .map(res => res.json());
  }

  handleError(error) {
    console.error(error);

  }

 /* get() {

    if (this.posts) {
      return Promise.resolve(this.posts);
    }

    return new Promise(resolve => {
      this.http.post('https://sandipgh19.000webhostapp.com/zersey/getData.php').map(res => <Array<postData>>(res.json()))
        .subscribe(p => {
          this.posts = p;
          resolve(this.posts);
        });
    });
    }*/

}
