import { IonicModule } from '@ionic/angular';
import { PasessComponent } from './pasess.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasessRoutingModule } from './pasess-routing.module';
import { PurchaseComponent } from './purchase/purchase.component';
import { FormsModule } from '@angular/forms';
import { PurchasedPasses } from './purchasedPassesList/purchasedPasses.component';


@NgModule({
  declarations: [PasessComponent, PurchaseComponent,PurchasedPasses],
  imports: [
    CommonModule,
    IonicModule,
    PasessRoutingModule,
    FormsModule
  ]
})
export class PasessModule { }
