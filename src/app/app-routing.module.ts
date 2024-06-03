import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticated } from './guards/isAuthenticated.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: 'login',
    title: 'Admin-Login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [isAuthenticated],
    children: [
      {
        path: '',
        title: 'BookHive-Dashboard',
        loadChildren: () =>
          import('./features/root/root.module').then((m) => m.RootModule),
      },
      {
        path: 'users',
        title: 'BookHive-Users',
        loadChildren: () =>
          import('./features/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'products',
        title: 'BookHive-Products',
        loadChildren: () =>
          import('./features/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
    ],
  },
  {
    path: '**',
    title: 'Page Not Found',
    loadChildren: () =>
      import('./features/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
