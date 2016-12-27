// CORE DEPS
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// MATERIAL DESIGN MODULES
import { MaterialModule } from '@angular/material';

import { SharedModule } from './shared/shared.module';
import { PeopleModule} from './people/people.module';

import { AppRoutes } from './app.routes';

import { PeopleAppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    AppRoutes,
    SharedModule,
    PeopleModule
  ],
  exports: [RouterModule],
  declarations: [
    PeopleAppComponent,
    HomeComponent
   ],
  providers: [
   ],
  bootstrap: [
    PeopleAppComponent
  ]
})
export class AppModule { }
