import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SplashPageRoutingModule } from './spalsh-routing.module';
import { SplashComponent } from './splash.component';


@NgModule({
    imports: [
        IonicModule,
        FormsModule,
        SplashPageRoutingModule

    ],
    declarations: [SplashComponent],
  
})
export class SplashPageModule { }
