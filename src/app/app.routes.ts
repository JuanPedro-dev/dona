import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home-page').then(m => m.HomePage),
  },
  {
    path: 'config',
    loadComponent: () => import('./pages/config').then(m => m.Config),
  },
  {
    path: 'add-item',
    loadComponent: () => import('./pages/add-item').then(m => m.AddItem),
  },
  {
    path: 'edit-item/:id',
    loadComponent: () => import('./pages/edit-item').then(m => m.EditItem),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found').then(m => m.NotFound),
  },
];
