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
  flag: any;
  terms:any="";
  constructor(private modalController:ModalController,private navParams: NavParams) { }

  ngOnInit(): void {

    this.qrImage = "data:image/jpeg;base64,"+this.navParams.get('qr');
    this.flag = this.navParams.get("flag");
    let temp = this.navParams.get("terms");
  if(temp!=undefined || temp!=null){
    this.terms = temp.replace("\r\n","<br>")
    document.getElementById("terms").innerHTML=this.terms;
   
  }
    
  }
  cancel()
  {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
