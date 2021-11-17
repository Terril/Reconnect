import { PasessComponent } from './pasess.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseComponent } from './purchase/purchase.component';
import { PurchasedPasses } from './purchasedPassesList/purchasedPasses.component';

const routes: Routes = [
  {
    path:"",
    component:PasessComponent
  },
  {
    path:"purchae",
    component:PurchaseComponent
  },
  {
    path:"passesList",
    component:PurchasedPasses
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasessRoutingModule { }
