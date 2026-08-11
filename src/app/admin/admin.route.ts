import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [

    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },

    {
        path: 'dashboard',
        loadComponent: () =>
            import('./dashboard/dashboard.component')
                .then(m => m.DashboardComponent)
    },

    {
        path: 'products',
        loadComponent: () =>
            import('./products/product-list/product-list.component')
                .then(m => m.ProductListComponent)
    },

    {
        path: 'products/create',
        loadComponent: () =>
            import('./products/product-form/product-form.component')
                .then(m => m.ProductFormComponent)
    },

    {
        path: 'products/edit/:id',
        loadComponent: () =>
            import('./products/product-form/product-form.component')
                .then(m => m.ProductFormComponent)
    },
    {
        path: 'orders',
        loadComponent: () =>
            import('./orders/order-list/order-list.component')
                .then(m => m.OrderListComponent)
    },
    {
        path: 'categories',
        loadComponent: () =>
            import('./categories/category-list/category-list.component')
                .then(m => m.CategoryListComponent)
    },
        {
        path: 'users',
        loadComponent: () =>
            import('./users/user-list/user-list.component')
                .then(m => m.UserListComponent)
    },

];