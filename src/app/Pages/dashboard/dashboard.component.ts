import { Component, OnInit, ViewChild  } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import {MenuController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { ModalController } from '@ionic/angular';
import { PophoverComponent } from '../detail-page/pophover/pophover.component';
import { WelcomepopupComponent } from './welcomepopup/welcomepopup.component';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  sliderOne: any;
  slidertwo: any;
  data: any;
  profileData:any;
  member_name:any;
  exp_date:any;
  placeHolder:string = './assets/preloader.gif';
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  modalDataResponse: any;
  condition: number = 2;
  list: any[] = new Array(5);
  slideOptsThumbs = {
    slidesPerView: 1.2,
  };
  classcartOrder= [];
  pexpdate: any;
  ptype: any;
  pmemberstart: any;
  pmemberend: any;
  constructor(private storage:Storage,public modalCtrl: ModalController,public myapp: AppComponent,private menu: MenuController,private router: Router) { 

    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
    };

  }
  async ionViewWillEnter() {
    await this.storage.create();
    this.storage.get("userdata").then(data=>{
     this.profileData = data;
     this.member_name = this.profileData.Name
    this.pexpdate = data.MembershipEndDate;
     this.ptype = data.membershipCategory==''?'N/A':data.membershipCategory;
     this.pmemberstart = data?.MembershipStartDate?.split("T")[0];
     this.exp_date = data?.MembershipEndDate?.split("T")[0];
    
   
    });
  }
   ngOnInit(){
    this.menu.enable(true);
    //this.initModal();
    let cartorderString = localStorage.getItem('classcartDetails');
    this.classcartOrder = JSON.parse(cartorderString);
   
  }

  async initModal() {
    const modal = await this.modalCtrl.create({
      component: WelcomepopupComponent,
      cssClass:'welcome_popup',
      showBackdrop:true,
      backdropDismiss:false,
    });
    return await modal.present();

  }
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });;
  }

  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }

  class_listing()
  {
    this.router.navigate(['/class_booking'])
  }
  booking()
  {
    this.router.navigate(['/details/1'])
  }
  profile()
  {
    this.router.navigate(['/tablinks/profile'])
  }
  pasess()
  {
    this.router.navigate(['/pasess'])
  }
  promotions()
  {
    this.router.navigate(['/promotions'])
  }
  offers()
  {
    this.router.navigate(['/vouchers'])
  }
  gym_booking()
  {
    this.router.navigate(['/gym-booking'])
  
  }
  partner_offers()
  {
    this.router.navigate(['/offers'])
  }
  bookings()
  {
    this.router.navigate(['/history'])
  }
  wallet()
  {
    this.router.navigate(['/digital-wallet'])
  }
  cart()
  {
  this.router.navigate(['/cart'])
  }
}
