// CORE DEPS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// MATERIAL DESIGN MODULES
import { MaterialModule } from '@angular/material';

import { CardComponent } from './../shared/card/card.component';
import { CartComponent } from './../shared/cart/cart.component';
import { DetailedCardComponent } from './../shared/detailed-card/detailed-card.component';
import { SearchBarComponent } from './../shared/search-bar/search-bar.component';
import { DrinkService } from './../shared/drink-service/drink.service';
import { OrderService } from './../shared/order-service/order.service';
import { CartService } from './../shared/cart-service/cart.service';
import { AuthenticationService } from './../shared/authentication-service/authentication.service';

import { DataTableModule, ButtonModule, SpinnerModule } from 'primeng/primeng';

import { LoggedInGuard } from './../login/logged-in.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    FormsModule,
    DataTableModule,
    ButtonModule,
    SpinnerModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CardComponent,
    DetailedCardComponent,
    SearchBarComponent,
    CartComponent,
    MaterialModule
  ],
  declarations: [
    CardComponent,
    CartComponent,
    DetailedCardComponent,
    SearchBarComponent
  ],
  providers: [
    DrinkService,
    OrderService,
    AuthenticationService,
    LoggedInGuard,
    CartService
  ],
  bootstrap: [
  ]
})
export class SharedModule { }
