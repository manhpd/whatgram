import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../model/user';
import { FirebaseUser } from '../model/firebaseUser';

import { Globals } from '../golbals.component'

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  private userLogin: User;
  private userId;
  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private userService: UserService, private global : Globals) { 
      this.user = _firebaseAuth.authState;

      this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;
            console.log(this.userDetails);
            var params= {
              "email": user.email,
              "displayName": user.displayName,
              "id": user.uid,
              "photoURL": user.photoURL
             };
            
            this.global.user = new User(user.uid, user.email,user.displayName, user.photoURL, "");
            this.userService.addUser (params);
          }
          else {
            this.userDetails = null;
          }
        }
      );
  }

  getFirebaseUserId() {
    return this.userDetails.uid;
  }

  getUserLogin() {
    return this.userLogin;
  }

  getUserId() {
    return this.userId;
  }


  signInWithEmailPassword(email:string, password:string) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email,password);
  }

  signInWithTwitter() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    )
  }


  signInWithFacebook() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    )
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  public registerUser(user: FirebaseUser): Promise<any> {
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
        .then((res: any) => {
            delete user.password;
          
        })
        .catch((error: Error) => {
            console.log(error);
        });
  }

  isLoggedIn() {
  if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }


  logout() {
    this._firebaseAuth.auth.signOut()
    .then((res) => this.router.navigate(['/']));
  }
}
