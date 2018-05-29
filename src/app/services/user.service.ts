import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

import { Http, Response, RequestOptions, Headers} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { User } from '../model/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as firebase from 'firebase/app';

const API_URL = environment.userApiUrl;

@Injectable()
export class UserService {

  constructor( private http : Http
  ) {
  }

  public getAllUsers(): Observable<User[]> {
    return this.http
      .get(API_URL)
      .map(response => {
        const users = response.json();
        return users.map((user) => new User(user));
      })
      .catch(this.handleError);
  }

  public addUser(user: User){
    console.log(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });
    return this.http.post(API_URL , user, options)
    .subscribe();
  }

  
  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}