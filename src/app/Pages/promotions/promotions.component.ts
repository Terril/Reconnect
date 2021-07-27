import { Component, OnInit } from '@angular/core';
import { PromotionsService } from './promotions.service';
import { ModalController,LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  list: any[] = new Array(5);
  condition: number = 2;
  loading:any;
  promostionList:any;
  constructor(private api:PromotionsService,public loadingController: LoadingController) { }

 async  ngOnInit(){
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
   this.api._getPartnerOfferList().subscribe(data =>{
    this.promostionList =  data;
    console.log(this.promostionList )
    this.loading.dismiss();
  })
  }

}
