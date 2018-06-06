import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate ,  ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {
  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
      this.user = afAuth.authState;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.user.map((auth) => {
          if (!auth) {
              this.router.navigateByUrl('login');
              return false;
          }
          return true;
      }).take(1);
  }
}
