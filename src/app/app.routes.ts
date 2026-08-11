import { Routes } from '@angular/router';
import path from 'path';
import { MyAccountComponent } from './features/account/my-account/my-account.component';
import { OrdersComponent } from './features/account/my-account/orders/orders.component';
import { FavoritsComponent } from './features/account/my-account/favorits/favorits.component';
import { AddressListComponent } from './features/account/my-account/address-list/address-list.component';
import { AccountInfoComponent } from './features/account/my-account/account-info/account-info.component';
import { EditProfileComponent } from './features/account/my-account/edit-profile/edit-profile.component';
import { ADMIN_ROUTES } from './admin/admin.route';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/shell/shell.component').then((m) => m.ShellComponent),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.component').then((m) => m.HomeComponent),
        data: { hideHeader: false, hideNav: false, hideMobileNav: false, loggedIn: true }
      },
      // { path: 'products', loadComponent: () => import('./features/products/product-list/product-list.component').then(m => m.ProductListComponent) },
      {
        path: 'products/:id',
        loadComponent: () =>
          import(
            './features/products/product-details/product-details.component'
          ).then((m) => m.ProductDetailsComponent),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/cart.component').then((m) => m.CartComponent),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/products/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ), data: { hideHeader: true, hideNav: false, hideMobileNav: false, loggedIn: true }
      },
      {
        path: 'categories/:slug',
        loadComponent: () =>
          import('./features/products/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./features/checkout/checkout.component').then(
            (m) => m.CheckoutComponent
          ),
      },
      {
        path: 'my-account',
        component: MyAccountComponent,
        data: { hideHeader: true, hideNav: false, hideMobileNav: false, loggedIn: true },
        children: [
          {
            path: 'orders',
            component: OrdersComponent
          },
          {
            path: 'favorites',
            component: FavoritsComponent
          },
          {
            path: 'address-list',
            component: AddressListComponent
          },
          {
            path: 'account-info',
            component: AccountInfoComponent
          },
          {
            path: 'edit-profile',
            component: EditProfileComponent
          }
        ]
      },


      {
        path: 'login',
        loadComponent: () =>
          import('./features/account/login/login.component').then(
            (m) => m.LoginComponent
          ),
        data: { hideNav: true, hideMobileNav: true, hideHeader: true, loggedIn: false },
      },

    ],

  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/layout/admin-layout/admin-layout.component').then(
        (m) => m.AdminLayoutComponent
      ),
    children: ADMIN_ROUTES
  },
  { path: '**', redirectTo: '' }
];
