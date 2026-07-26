import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
    { path: 'products', loadComponent: () => import('./features/products/product-list/product-list.component').then(m => m.ProductListComponent) },
    { path: 'products/:id', loadComponent: () => import('./features/products/product-details/product-details.component').then(m => m.ProductDetailsComponent) },
    { path: 'cart', loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent) },
    { path: 'checkout', loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent), canActivate: [() => /* auth guard */ true] },
    { path: 'admin', loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent) },
    { path: '**', redirectTo: '' }
];
