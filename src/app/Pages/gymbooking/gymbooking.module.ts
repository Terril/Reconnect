import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GymbookingRoutingModule } from './gymbooking-routing.module';
import { GymbookingComponent } from './gymbooking.component';


@NgModule({
  declarations: [GymbookingComponent],
  imports: [
    CommonModule,
    IonicModule,
    GymbookingRoutingModule
  ]
})
export class GymbookingModule { }
