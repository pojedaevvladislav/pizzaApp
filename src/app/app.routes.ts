import {CanActivateFn, Router, Routes} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userId = localStorage.getItem('userId');

  if (!userId) {
    router.navigateByUrl('/login-page');
    return false;
  }
  return true;
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-page',
    pathMatch: 'full',
  },
  {
    path: 'login-page',
    loadComponent: () =>
      import('./pages/login-page/login-page.page').then( m => m.LoginPagePage)
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'pizza/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/pizza-details/pizza-details.page').then( m => m.PizzaDetailsPage)
  },
  {
    path: 'cart-page',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/cart-page/cart-page.page').then( m => m.CartPagePage)
  },
  {
    path: 'status-order',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/status-order/status-order.page').then( m => m.StatusOrderPage)
  },
  {
    path: 'my-orders',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/my-orders/my-orders.page').then(m => m.MyOrdersPage)
  },
  {
    path: 'order-details/:orderId',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/order-details/order-details.page').then( m => m.OrderDetailsPage)
  },
];
