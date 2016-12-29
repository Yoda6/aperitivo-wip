// CORE DEPS
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { DrinksRoute } from './drinks.routes';

import { SharedModule } from './../shared/shared.module';

import { DrinksComponent } from './../drinks/drinks.component';
import { DrinkComponent } from './../drinks/drink/drink.component';

@NgModule({
  imports: [
    SharedModule,
    DrinksRoute,
    RouterModule
  ],
  exports: [
    DrinksComponent,
    DrinkComponent,
    RouterModule
  ],
  declarations: [
    DrinksComponent,
    DrinkComponent
   ],
  providers: [
   ],
  bootstrap: [
  ]
})
export class DrinksModule { }
