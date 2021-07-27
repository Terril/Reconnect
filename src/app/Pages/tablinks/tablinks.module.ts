import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, iosTransitionAnimation } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TablinksComponent } from './tablinks.component';
import { TablinksPageRoutingModule } from './tablinks-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot({navAnimation: iosTransitionAnimation}),
    TablinksPageRoutingModule
  ],
  declarations: [TablinksComponent]
})
export class TablinksPageModule {}
