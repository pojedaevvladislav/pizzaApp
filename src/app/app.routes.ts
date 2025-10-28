import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login-page',
    loadComponent: () =>
      import('./pages/login-page/login-page.page').then( m => m.LoginPagePage)
  },
  {
    path: 'pizza/:id',
    loadComponent: () =>
      import('./pages/pizza-details/pizza-details.page').then( m => m.PizzaDetailsPage)
  },
];
