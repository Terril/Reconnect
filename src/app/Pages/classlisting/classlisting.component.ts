import { ClassListingService } from './classlisting.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { ModalController,LoadingController } from '@ionic/angular';
import { CartComponent } from '../cart/cart.component';
import { PopupComponent } from './popup/popup.component';

@Component({
  selector: 'app-booking',
  templateUrl: './classlisting.component.html',
  styleUrls: ['./classlisting.component.css']
})
export class ClassListingComponent implements OnInit {
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  data: any;
  sliderOne: any;
  monthname:any;
  selected_day:any;
  allDays = [];
  calenderData:any;
  slideOptsThumbs = {
    slidesPerView: 2.9,
    spaceBetween:20
  };
  current_month:any = new Date().getMonth();
  slideOptions = {
    initialSlide: 26,
    slidesPerView: 5,
    autoplay: false
  };

  categories:any;
  classListarray:any;
  classListingDataHolder:any = [];
  
   monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  daysname = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  list: any[] = new Array(5);
  constructor(public modalController: ModalController,private router:Router,private api:ClassListingService,public loadingController: LoadingController) { 

  

  }
  active:any = 'time_name';
  activeIndex: number = 0;
  loading:any;
  async ngOnInit(){
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    this.selected_day = 26;
    this.generate_calender(this.current_month);
    //this.modalController.dismiss();
    this.get_class_listing();
   
  }

  get_class_listing()
  {
    this.loading.present();
    this.api._class_listing().subscribe(data=>{
     
      this.categories = data.ClassType;
      this.classListarray = data.ClassList;
      console.log(this.classListarray);
      this.loading.dismiss();
      this.classListingDataHolder.push(this.classListarray[0]) ;
    });
  }
 
  load_clasess(id)
  {
    this.loading.present();
    this.classListingDataHolder = [];
    this.classListingDataHolder.push(this.classListarray[id]);
    this.loading.dismiss();

  }
  next_month()
  {
    this.current_month = this.current_month + 1 ;
    
    if(this.monthNames.length > this.current_month)
    {
      this.selected_day = 1;
      this.generate_calender(this.current_month);
      this.slideWithNav.slideTo(this.selected_day-1)
     
    }

  }
  load_date(obj)
  {
    this.selected_day = obj.date;
  }

  generate_calender(month)
  {
   
    this.monthname = this.monthNames[month];
     this.allDays = [];

    for (let i = 0; i < 12; i++) {
   
      if(i==month)
      {
      var daysInMonth = new Date(2021, i+1, 0).getDate();
      this.calenderData = {month_name:this.monthNames[daysInMonth]};
      this.calenderData = this.allDays;
      for (let d = 1; d <= daysInMonth; d++) {
        this.allDays.push({month:this.monthNames[new Date(2021, i, d).getMonth()],date:d,day_name:this.daysname[new Date(2021, i, d).getDay()]});
       //  console.log(this.monthNames[new Date(2021, i, d).getMonth()]+""+ d+'<br>'+this.daysname[new Date(2021, i, d).getDay()])
      }
    }
      
  }
    console.log(this.calenderData)
  }
  onSegmentChanged(event)
  {
    
  }
  onSegmentSelected(event)
  {
  
  }
 
  ionViewWillEnter() {
    this.slideWithNav.slideTo(this.selected_day-1)
  }


  items = [
    {
      id: 1,
      title: 'TODAY'
    },
    {
      id: 2,
      title: 'TOMORRROW'
    },
    {
      id: 3,
      title: 'TUE 8 JUNE'
    },
    {
      id: 3,
      title: 'WED 9 JUNE'
    }
];

  loadTime(id){
    this.sliderOne.lockSwipes(true);
  }
  onClickSlide(id) {
    this.activeIndex = id;
}

 booking() {
   this.router.navigate(['/details/'+1]);
  
}


}
