import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionsRoutingModule } from './promotions-routing.module';
import { PromotionsComponent } from './promotions.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [PromotionsComponent],
  imports: [
    CommonModule,
    IonicModule,
    PromotionsRoutingModule
  ]
})
export class PromotionsModule { }
