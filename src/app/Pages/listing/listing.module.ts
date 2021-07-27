import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ListingComponent } from './listing.component';
import { ListingPageRoutingModule } from './listing-routing.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListingPageRoutingModule
  ],
  declarations: [ListingComponent]
})
export class ListingPageModule {}
