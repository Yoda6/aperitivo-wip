import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS
import { StockComponent } from './stock/stock.component';

import { LoggedInGuard } from './../login/logged-in.guard';

const ROUTES: Routes = [
  {path: 'admin', component: StockComponent, canActivate: [LoggedInGuard] }
];

export const AdminRoutes: ModuleWithProviders = RouterModule.forChild(ROUTES);
