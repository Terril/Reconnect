import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PolicyComponent } from './policy.component';
import { PolicyRoutingModule } from './policy-routing.module';



@NgModule({
  declarations: [PolicyComponent],
  imports: [
    CommonModule,
    IonicModule,
    PolicyRoutingModule
  ]
})
export class PolicyModule { }
