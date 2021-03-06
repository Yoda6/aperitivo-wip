import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS
import { HomeComponent } from './home/home.component';
import { DrinksComponent } from './drinks/drinks.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './shared/cart/cart.component';

import { LoggedInGuard } from './login/logged-in.guard';

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
  { path: 'drinks', component: DrinksComponent, canActivate: [LoggedInGuard] },
  { path: 'cart', component: CartComponent, canActivate: [LoggedInGuard] }
];

export const AppRoutes = RouterModule.forRoot(ROUTES, { useHash: true });
