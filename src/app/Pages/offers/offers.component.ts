import { OffersService } from './offers.service';
import { Component, OnInit } from '@angular/core';
import { ModalController,LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  list: any[] = new Array(5);
  condition: number = 2;
  slideOptsThumbs = {
    slidesPerView: 2.9,
    spaceBetween:20
  };
  loading:any;
  offersList:any;
  baseUrl: any;
  classcartOrder: any;
  
  constructor(private api:OffersService,public loadingController: LoadingController, private router:Router) { }

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
   this.api._getoffersOfferList().subscribe(data =>{
    this.offersList =  data.PartnerList;
    this.loading.dismiss();
  })
  }
  cart()
  {
  this.router.navigate(['/cart'])
  }

}
