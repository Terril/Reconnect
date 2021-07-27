import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { WelcomepopupComponent } from './welcomepopup/welcomepopup.component';





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule
  ],
  declarations: [DashboardComponent, WelcomepopupComponent]
})
export class DashboardPageModule {}
