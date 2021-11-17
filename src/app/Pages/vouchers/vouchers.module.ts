import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VouchersRoutingModule } from './vouchers-routing.module';
import { IonicModule } from '@ionic/angular';
import { VouchersComponent } from './vouchers.component';
import { QRComponent } from './qr/qr.component';
import { SubVouchersComponent } from './subvouchers/subvoucher.component';


@NgModule({
  declarations: [VouchersComponent, QRComponent,SubVouchersComponent],
  imports: [
    CommonModule,
    IonicModule,
    VouchersRoutingModule
  ]
})
export class VouchersModule { }
