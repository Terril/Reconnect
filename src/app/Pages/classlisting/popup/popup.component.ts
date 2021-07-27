import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(public modalController: ModalController,private router:Router) { }

  ngOnInit(): void {
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
  
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  checkout()
  {
    this.modalController.dismiss({
      'dismissed': true
    });
    this.router.navigate(['/checkout']);
  }
}
