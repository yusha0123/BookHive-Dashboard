import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootRoutingModule } from './root-routing.module';
import { RootComponent } from './root.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [RootComponent],
  imports: [CommonModule, RootRoutingModule, SharedModule],
})
export class RootModule {}
