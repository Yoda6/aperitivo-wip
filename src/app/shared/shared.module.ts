// CORE DEPS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// MATERIAL DESIGN MODULES
import { MaterialModule } from '@angular/material';

import { CardComponent } from './../shared/card/card.component';
import { DetailedCardComponent } from './../shared/detailed-card/detailed-card.component';
import { SearchBarComponent } from './../shared/search-bar/search-bar.component';
import { DrinkService } from './../shared/drink-service/drink.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    FormsModule,
    MaterialModule.forRoot()
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CardComponent,
    DetailedCardComponent,
    SearchBarComponent,
    MaterialModule
  ],
  declarations: [
    CardComponent,
    DetailedCardComponent,
    SearchBarComponent
  ],
  providers: [
    DrinkService
  ],
  bootstrap: [
  ]
})
export class SharedModule { }
