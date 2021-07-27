import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuccessRoutingModule } from './success-routing.module';
import { SuccessComponent } from './success.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [SuccessComponent],
  imports: [
    CommonModule,
    IonicModule,
    SuccessRoutingModule
  ]
})
export class SuccessModule { }
