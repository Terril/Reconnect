import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetpasswordComponent } from './resetpassword.component';
import { ResetPasswordRoutingModule } from './resetpassword-routing.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ResetpasswordComponent],
  imports: [
    CommonModule,
    IonicModule,
    ResetPasswordRoutingModule
  ]
})
export class ResetpasswordModule { }
