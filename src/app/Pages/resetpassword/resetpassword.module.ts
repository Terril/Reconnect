import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetpasswordComponent } from './resetpassword.component';
import { ResetPasswordRoutingModule } from './resetpassword-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ResetpasswordComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ResetPasswordRoutingModule
  ]
})
export class ResetpasswordModule { }
