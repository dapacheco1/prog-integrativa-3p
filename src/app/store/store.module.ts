import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { LandingComponent } from './components/landing/landing.component';
import { ProductosComponent } from './components/productos/productos.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LandingComponent,
    ProductosComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    FormsModule
  ]
})
export class StoreModule { }
