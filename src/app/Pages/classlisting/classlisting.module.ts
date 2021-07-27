import { ClassListinRoutingModule } from './classlisting-routing.module';
import { ClassListingComponent } from './classlisting.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



import { PopupComponent } from './popup/popup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassListinRoutingModule
  ],
  declarations: [ClassListingComponent, PopupComponent]
})
export class ClassListingPageModule {}
