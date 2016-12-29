// CORE DEPS
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
// MATERIAL DESIGN MODULES
import { MaterialModule } from '@angular/material';

import { SharedModule } from './shared/shared.module';
import { DrinksModule} from './drinks/drinks.module';
import { TagInputModule } from 'ng2-tag-input';

import { AppRoutes } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    AppRoutes,
    SharedModule,
    DrinksModule,
    TagInputModule
  ],
  exports: [
    RouterModule,
    TagInputModule
  ],
  declarations: [
    AppComponent,
    HomeComponent
   ],
  providers: [
   ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
