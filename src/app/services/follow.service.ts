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

const FOLLOW_API_URL = environment.followApiUrl;
const FOLLOW_API_URL_2 = environment.followApiUrl2;
@Injectable()
export class FollowService {

    followings: string[];

    constructor( private http : Http) {
    
    }

  getFollowers(userId: string) {
    
    return ;
  }

  getUserFollowing(UserId:string) {
   
    return this.http
    .options(FOLLOW_API_URL,{"body":{"id": UserId}})
    .map(response => {
      return response;
    })
    .catch(this.handleError);
  }

  getFollowingUsers(followings, uid) : Observable<User[]>{
    return this.http
    .put(FOLLOW_API_URL_2, {"followings":followings,
        "uid" : uid})
    .map(response => {
      const users = response.json()["Items"];
      console.log(users);
      return users;
    })
    .catch(this.handleError);
  }

  follow(followerId: string, followingId: string) {
    return this.http
    .post(FOLLOW_API_URL,{
        "followerId"    : followerId,
        "followingId"   : followingId})
    .map(response => {
        console.log(response);
      return response;
      
    }).toPromise();
  }

  unfollow(followerId: string, followingId: string) {
    return this.http
    .put(FOLLOW_API_URL,{
        "followerId"    : followerId,
        "followingId"   : followingId})
    .map(response => {
        console.log(response);
      return response;
    })
    .catch(this.handleError).toPromise();
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}