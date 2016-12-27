// CORE DEPS
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { PeopleRoute } from './people.routes';

import { SharedModule } from './../shared/shared.module';

import { PeopleComponent } from './../people/people.component';
import { PersonComponent } from './../people/person/person.component';
import { UpdateComponent } from './../people/update/update.component';
import { MapComponent } from './map/map.component';

@NgModule({
  imports: [
    SharedModule,
    PeopleRoute,
    RouterModule
  ],
  exports: [
    PeopleComponent,
    PersonComponent,
    UpdateComponent,
    RouterModule
  ],
  declarations: [
    PeopleComponent,
    PersonComponent,
    UpdateComponent,
    MapComponent
   ],
  providers: [
   ],
  bootstrap: [
  ]
})
export class PeopleModule { }
