import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS
import { DrinksComponent } from './../drinks/drinks.component';
import { DrinkComponent } from './../drinks/drink/drink.component';

const ROUTES: Routes = [
  {path: 'drinks', component: DrinksComponent},
  {path: 'drinks/:id', component: DrinkComponent}
];


export const DrinksRoute: ModuleWithProviders = RouterModule.forChild(ROUTES);
