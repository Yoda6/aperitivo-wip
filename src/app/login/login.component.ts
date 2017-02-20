import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication-service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authentService: AuthenticationService;

  constructor(authentService: AuthenticationService) {
    this.authentService = authentService;
  }

  ngOnInit() {
  }

  login() {
    this.authentService.login();
  }
}
