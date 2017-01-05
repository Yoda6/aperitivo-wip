import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service/authentication.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private _authenticationService: AuthenticationService) {}

  canActivate() {
    return this._authenticationService.isLoggedIn();
  }
}