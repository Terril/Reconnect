import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, iosTransitionAnimation } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ImagePreloader } from './Utility/ImagePreloader';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';




@NgModule({
  declarations: [AppComponent,ImagePreloader],
  entryComponents: [],
  imports: [IonicStorageModule.forRoot(),HttpClientModule,BrowserModule, IonicModule.forRoot({navAnimation: iosTransitionAnimation}), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },InAppBrowser ],
  bootstrap: [AppComponent],
})
export class AppModule {}
