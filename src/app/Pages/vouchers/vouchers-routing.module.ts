import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubVouchersComponent } from './subvouchers/subvoucher.component';
import { VouchersComponent } from './vouchers.component';

const routes: Routes = [{
  path:"",
  component:VouchersComponent
},
{
  path:"voucherList",
  component:SubVouchersComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VouchersRoutingModule { }
