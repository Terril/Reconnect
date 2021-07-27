import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { DetailPageComponent } from './detail-page.component';
import { DetailPagePageRoutingModule } from './detail-page-routing.module';
import { PophoverComponent } from './pophover/pophover.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPagePageRoutingModule
  ],
  declarations: [DetailPageComponent, PophoverComponent]
})
export class DetailPagePageModule {}
