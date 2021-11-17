import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoucherRedeemComponent } from './voucher-redeem.component';




const routes: Routes = [
  {
    path: '',
    component: VoucherRedeemComponent,
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoucherRedeemRoutingModule {}
