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
import 'rxjs/add/observable/of';
import { Fileupload } from '../model/fileupload';

import 'rxjs/add/operator/toPromise';

import { Progress } from './progress.service';

const API_URL = environment.userApiUrl;
const SEARCH_API_URL = environment.searchApiUrl;


@Injectable()
export class UserService {

  
  constructor( private http : Http) {
    
  }

  public getAllUsers() {
   
    return this.http
    .get(API_URL)
    .map(response => {
      const users = response.json();
      return users.map((user) => new User(user.id,user.displayNmae,user.email,user.photoURL,user.userName));
    })
    .catch(this.handleError);
  }

  public getUserById(req): Observable<any> {
    return  this.http
      .options(API_URL, { "body" :{"id":req}})
      .map(response => {
        const user = response.json();
        return user;
      })
      .catch(this.handleError);
  }

  public addUser(params){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(params);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(API_URL , params, options) 
    .subscribe();
  }
  public updateUser(params) {
    return this.http.put(API_URL , params) 
    .subscribe();
  }

  public searchUsers (params) : Observable<User[]>{
    return this.http
      .post(SEARCH_API_URL, params)
      .map(response => {
        const users = response.json();
       
        return users.map((user) => new User(user.id, user.email,user.displayName, user.photoURL,user.userName));
      })
      .catch(this.handleError);
  }
  
  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}