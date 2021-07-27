import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassbookingRoutingModule } from './classbooking-routing.module';
import { IonicModule } from '@ionic/angular';
import { ClassbookingComponent } from './classbooking.component';


@NgModule({
  declarations: [ClassbookingComponent],
  imports: [
    CommonModule,
    IonicModule,
    ClassbookingRoutingModule
  ]
})
export class ClassbookingModule { }
