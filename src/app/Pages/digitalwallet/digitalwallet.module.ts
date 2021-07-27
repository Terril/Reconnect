import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DigitalwalletRoutingModule } from './digitalwallet-routing.module';
import { DigitalwalletComponent } from './digitalwallet.component';
import { IonicModule } from '@ionic/angular';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';

@NgModule({
  declarations: [DigitalwalletComponent],
  imports: [
    CommonModule,
    IonicModule,
    DigitalwalletRoutingModule
  ],
  providers:[NFC,Ndef]
})
export class DigitalwalletModule { }
