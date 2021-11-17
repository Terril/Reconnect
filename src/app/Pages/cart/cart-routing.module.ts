import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoucherRedeemComponent } from '../voucher-redeem/voucher-redeem.component';
import { CartComponent } from './cart.component';


const routes: Routes = [
  {
    path: '',
    component: CartComponent,
  },
  {
    path: 'voucherredeem',
    component: VoucherRedeemComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartPageRoutingModule {}
