import { Injectable } from '@angular/core';
import { Http , Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

/*
  Generated class for the RedditDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RedditDataProvider {

  constructor(public http: Http) {
    console.log('Hello RedditDataProvider Provider');

  }

  getRemoteData(){
  	 var url = 'https://www.reddit.com/r/gifs/top/.json';
  	 var response = this.http.get(url).map(res => res.json());
        return response;
  }

}
