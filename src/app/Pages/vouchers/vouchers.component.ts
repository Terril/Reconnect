import { Component, OnInit } from '@angular/core';
import { QRComponent } from './qr/qr.component';
import { VouchersService } from './vouchers.service';
import { ModalController,LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.css']
})
export class VouchersComponent implements OnInit {
  list: any[] = new Array(5);
  condition: number = 2;
  slideOptsThumbs = {
    slidesPerView: 2.9,
    spaceBetween:6 
  };
  loading:any;
  vouchersList:any;
  constructor(private modalController:ModalController,private api:VouchersService,public loadingController: LoadingController) { }

 async ngOnInit(){

    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    this. get_listing();
  }


  get_listing()
  {
    this.loading.present();
   this.api._getVoucherList().subscribe(data =>{
    this.vouchersList =  data.VoucherList;
    this.loading.dismiss();
    console.log(this.vouchersList )
  })
  }
  async opn_qr(qr)
  {
    const myModal = await this.modalController.create({
      component: QRComponent,
      cssClass:'qr-code-modal',
      showBackdrop:true,
      componentProps: { qr: qr },
      backdropDismiss:false,
    });
    return await myModal.present();
  }

}
