import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { PophoverComponent } from './pophover/pophover.component';
import { PopupComponent } from '../classlisting/popup/popup.component';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {
  condition: number = 2;
  list: any[] = new Array(5);
  constructor(public popoverController: PopoverController,private location: Location,private router:Router,private navCtrl: NavController,private modalController:ModalController) { }

  ngOnInit(): void {
  }
  back()
  {
    this.navCtrl.pop();
    
  }
  addCart()
  {
    this.router.navigate(['/cart']);
  }
  addwish()
  {
    this.router.navigate(['/tablinks/wishlist']);
  }
  booking()
  {
    this.router.navigate(['/booking/1'])
  }

  async presentActionSheet() {
    const myModal = await this.modalController.create({
      component: PopupComponent,
      cssClass:'add-booking-modal',
      showBackdrop:true,
      backdropDismiss:false,
    });
    return await myModal.present();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PophoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
