import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassbookingComponent } from './classbooking.component';

const routes: Routes = [{
  path:"",
  component:ClassbookingComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassbookingRoutingModule { }
