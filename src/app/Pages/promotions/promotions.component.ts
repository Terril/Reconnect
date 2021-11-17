import { Component, OnInit } from '@angular/core';
import { PromotionsService } from './promotions.service';
import { ModalController,LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
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
  baseUrl: any;
  classcartOrder: any;
  constructor(private api:PromotionsService,public loadingController: LoadingController, private router:Router) { }

 async  ngOnInit(){
  let cartorderString = localStorage.getItem('classcartDetails');
  this.classcartOrder = JSON.parse(cartorderString);
     this.baseUrl=environment.imageUrl;
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
   this.api._getHotelOfferList().subscribe(data =>{
    this.promostionList =  data.HotelPromotionList;
    console.log(this.promostionList )
    this.loading.dismiss();
  })
  }
  cart()
{
this.router.navigate(['/cart'])
}
}
