// CORE DEPS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataTableModule, SharedModule, DialogModule, ButtonModule, InputTextModule,
         InputTextareaModule, SpinnerModule, FileUploadModule } from 'primeng/primeng';
// MATERIAL DESIGN MODULES
import { MaterialModule } from '@angular/material';

import { AdminRoutes } from './admin.routes';

import { StockComponent } from './stock/stock.component';
import { OrdersComponent } from './orders/orders.component';
import { DrinkService } from './../shared/drink-service/drink.service';
import { AuthenticationService } from './../shared/authentication-service/authentication.service';

import { LoggedInGuard } from './../login/logged-in.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    AdminRoutes,
    DataTableModule,
    SharedModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    SpinnerModule,
    FileUploadModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    StockComponent,
    OrdersComponent
  ],
  providers: [
    DrinkService,
    AuthenticationService,
    LoggedInGuard
  ],
  bootstrap: [
  ]
})
export class AdminModule { }
