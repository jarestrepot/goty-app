import { Routes } from '@angular/router';

export const routesChildrenHome: Routes = [
  {
    path: 'init',
    title: 'Init',
    loadComponent: () => import('@pages/init/init.component').then(c => c.InitComponent),
    children: [],
  },
  {
    path: 'goty',
    title: 'Goty',
    loadComponent: () => import('@pages/goty/goty.component').then(c => c.GotyComponent),
    children: [],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'init'
  }
];
