import { Routes } from '@angular/router';

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
          ),
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
        loadComponent: () =>
          import('./features/account/my-account/my-account.component').then(
            (m) => m.MyAccountComponent
          ),
        data: { hideHeader: true, hideNav: true },
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/account/login/login.component').then(
            (m) => m.LoginComponent
          ),
        data: { hideNav: true, hideMobileNav: true, hideHeader: true },
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('./features/admin/admin.component').then(
            (m) => m.AdminComponent
          ),
      },
      // { path: '**', redirectTo: '' }
    ],
  },
];
