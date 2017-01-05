// CORE DEPS
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
// MATERIAL DESIGN MODULES
import { MaterialModule } from '@angular/material';
import 'hammerjs';

// FIREBASE
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
const firebaseConfig = {
  apiKey: 'AIzaSyBZYveiMkIu8NvDd2ZY6rAKcYDpYG63vyI',
  authDomain: 'aperitivo-247b0.firebaseapp.com',
  databaseURL: 'https://aperitivo-247b0.firebaseio.com',
  storageBucket: 'aperitivo-247b0.appspot.com',
  messagingSenderId: '629447708280'
};

import { SharedModule } from './shared/shared.module';
import { DrinksModule } from './drinks/drinks.module';
import { AdminModule } from './admin/admin.module';

import { AppRoutes } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { LoggedInGuard } from './login/logged-in.guard';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, {
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }),
    AppRoutes,
    SharedModule,
    DrinksModule,
    AdminModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  providers: [
    LoggedInGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
