import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-welcomepopup',
  templateUrl: './welcomepopup.component.html',
  styleUrls: ['./welcomepopup.component.css']
})
export class WelcomepopupComponent implements OnInit {

  activaLayer:any;
 
  constructor(public modalController: ModalController) { }

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
   
  }
  select_branch(id)
  {
    this.activaLayer = id;

  }
}
