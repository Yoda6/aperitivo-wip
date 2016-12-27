import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// APP COMPONENTS
import { PeopleComponent } from './../people/people.component';
import { UpdateComponent } from './../people/update/update.component';
import { MapComponent } from './../people/map/map.component';

const ROUTES: Routes = [
  {path: '', component: PeopleComponent},
  {path: 'map', component: MapComponent},
  {path: 'edit/:id', component: UpdateComponent}
];


export const PeopleRoute: ModuleWithProviders = RouterModule.forChild(ROUTES);
