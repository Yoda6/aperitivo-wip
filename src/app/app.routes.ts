import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS
import { HomeComponent } from './home/home.component';
import { DrinksComponent } from './drinks/drinks.component';

const ROUTES: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'drinks', component: DrinksComponent},
];

export const AppRoutes = RouterModule.forRoot(ROUTES,{useHash: true});
