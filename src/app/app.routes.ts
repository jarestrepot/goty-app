import { Routes } from '@angular/router';
import { routesChildrenHome } from '@pages/pages.routes';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Home',
    loadComponent : () => import('@pages/home/home.component').then( c => c.HomeComponent ),
    children: routesChildrenHome,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];
