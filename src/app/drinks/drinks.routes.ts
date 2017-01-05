import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS
import { DrinksComponent } from './../drinks/drinks.component';
import { DrinkComponent } from './../drinks/drink/drink.component';

import { LoggedInGuard } from './../login/logged-in.guard';

const ROUTES: Routes = [
  {path: 'drinks', component: DrinksComponent, canActivate: [LoggedInGuard] },
  {path: 'drinks/:id', component: DrinkComponent, canActivate: [LoggedInGuard] }
];


export const DrinksRoute: ModuleWithProviders = RouterModule.forChild(ROUTES);
