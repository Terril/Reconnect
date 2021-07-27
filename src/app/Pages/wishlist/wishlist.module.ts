import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { WishlistPageRoutingModule } from './wishlist-routing.module';
import { WishlistComponent } from './wishlist.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WishlistPageRoutingModule
  ],
  declarations: [WishlistComponent]
})
export class WishlistPageModule {}
