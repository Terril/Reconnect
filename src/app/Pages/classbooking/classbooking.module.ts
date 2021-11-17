import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassbookingRoutingModule } from './classbooking-routing.module';
import { IonicModule } from '@ionic/angular';
import { ClassbookingComponent } from './classbooking.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ClassbookingComponent],
  imports: [
    CommonModule,
    IonicModule,
    ClassbookingRoutingModule,
    FormsModule,
  ]
})
export class ClassbookingModule { }
