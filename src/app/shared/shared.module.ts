import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ngxUiLoaderConfig } from '../constants';
import { IconComponent } from '../components/icon/icon.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { ProductDialogComponent } from '../components/product-dialog/product-dialog.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    IconComponent,
    NavbarComponent,
    SidebarComponent,
    ConfirmDialogComponent,
    ProductDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    FontAwesomeModule,
    MatDialogModule,
    RouterModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    FontAwesomeModule,
    MatDialogModule,
    NgxUiLoaderModule,
    ToastrModule,
    IconComponent,
    NavbarComponent,
    SidebarComponent,
    ConfirmDialogComponent,
    ProductDialogComponent,
  ],
})
export class SharedModule {}
