import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DigitalwalletComponent } from './digitalwallet.component';

const routes: Routes = [{
  path:'',
  component:DigitalwalletComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigitalwalletRoutingModule { }
