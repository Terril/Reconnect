import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GymbookingComponent } from './gymbooking.component';

const routes: Routes = [{
  path:"",
  component:GymbookingComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GymbookingRoutingModule { }
