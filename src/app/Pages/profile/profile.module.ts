import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { ProfilePageRoutingModule } from './profile-routing.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    
  ],
  providers:[],
  declarations: [ProfileComponent]
})
export class ProfilePageModule {}
