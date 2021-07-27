import { IonicModule } from '@ionic/angular';
import { PasessComponent } from './pasess.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasessRoutingModule } from './pasess-routing.module';
import { PurchaseComponent } from './purchase/purchase.component';


@NgModule({
  declarations: [PasessComponent, PurchaseComponent],
  imports: [
    CommonModule,
    IonicModule,
    PasessRoutingModule
  ]
})
export class PasessModule { }
