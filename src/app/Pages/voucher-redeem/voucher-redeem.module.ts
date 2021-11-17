import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { VoucherRedeemRoutingModule } from './voucher-redeem-routing.module';
import { VoucherRedeemComponent } from './voucher-redeem.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
   VoucherRedeemRoutingModule
  ],
  declarations: [VoucherRedeemComponent]
})
export class VoucherRedeemModule {}
