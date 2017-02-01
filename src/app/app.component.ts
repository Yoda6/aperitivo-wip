import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/authentication-service/authentication.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  authentService: AuthenticationService;

  constructor(authentService: AuthenticationService) {
    this.authentService = authentService;
  }

  ngOnInit() {
  }

  logout() {
    return this.authentService.logout();
  }

  login() {
  }
}
