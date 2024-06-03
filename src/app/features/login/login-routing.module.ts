import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { unAuthenticated } from 'src/app/guards/unAuthenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [unAuthenticated],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
