import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';


@Injectable()
export class AuthenticationService {

  user = null;

  constructor(private _router: Router, private _angularFire: AngularFire) {
     this._angularFire.auth.subscribe(user => {
      if (user) {
        this.user = user;
        this._router.navigate(['home']);
      } else {
        this.user = null;
        this._router.navigate(['login']);
      }
    });
  }

  login() {
    this._angularFire.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Redirect
    });
  }

  logout() {
    this._angularFire.auth.logout();
  }

  isLoggedIn() {
    return this.user !== null;
  }
}
