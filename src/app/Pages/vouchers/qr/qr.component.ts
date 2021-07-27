import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})

export class QRComponent implements OnInit {

  qrImage:any;
  constructor(private modalController:ModalController,private navParams: NavParams) { }

  ngOnInit(): void {

    this.qrImage = "data:image/jpeg;base64,"+this.navParams.get('qr');
    
  }
  cancel()
  {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
