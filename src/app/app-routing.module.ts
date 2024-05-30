import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { RootComponent } from './pages/root/root.component';
import { UsersComponent } from './pages/users/users.component';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  {
    path: 'login',
    title: 'Admin-Login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: RootComponent, title: 'BookHive-Dashboard' },
      { path: 'users', component: UsersComponent, title: 'BookHive-Users' },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'BookHive-Products',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
