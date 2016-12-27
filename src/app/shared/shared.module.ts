// CORE DEPS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// MATERIAL DESIGN MODULES
import { MaterialModule } from '@angular/material';

import { CardComponent } from './../shared/card/card.component';
import { FormComponent } from './../shared/form/form.component';
import { PeopleService } from './../shared/people-service/people.service';
import { NaPipe } from './../shared/na-pipe/na.pipe';
import { SfeirBadgeDirective } from './../shared/badge/sfeir-badge.directive';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule.forRoot()
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CardComponent,
    FormComponent,
    MaterialModule,
    NaPipe,
    SfeirBadgeDirective,
  ],
  declarations: [
    CardComponent,
    FormComponent,
    NaPipe,
    SfeirBadgeDirective
  ],
  providers: [
    PeopleService
  ],
  bootstrap: [
  ]
})
export class SharedModule { }
