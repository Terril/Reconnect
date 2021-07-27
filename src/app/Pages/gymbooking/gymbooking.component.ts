import { Component, OnInit, ViewChild } from '@angular/core';

import { IonSlides, ModalController } from '@ionic/angular';
import { PopupComponent } from '../classlisting/popup/popup.component';
@Component({
  selector: 'app-gymbooking',
  templateUrl: './gymbooking.component.html',
  styleUrls: ['./gymbooking.component.css']
})
export class GymbookingComponent implements OnInit {
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  data: any;
  monthname:any;
  sliderOne: any;
  selected_day:any;
  allDays = [];
  calenderData:any;
  show_container_one:boolean = true;
  icon_name = "caret-down-outline";
  show_container_two:boolean = false;
  icon_name_two = "caret-down-outline";
  current_month:any = new Date().getMonth();
  monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  daysname = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  time = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00','16:00'];
  active:any = 'time_name';
  activeIndex: number = 0;
  activaLayer:any;
  activatime:any;
  slideOptions = {
    initialSlide: 26,
    slidesPerView: 5,
    autoplay: false
  };
  constructor(public modalController: ModalController) { }

  ngOnInit(): void {

    this.selected_day = 26;
    this.generate_calender(this.current_month);
    
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
  select_branch(id)
  {
    this.activaLayer = id;
    this.show_container_two = true;
    this.icon_name_two = "caret-down-outline"
  }

  select_time(id)
  {
   this.activatime = id;
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
    setTimeout(() => {
      this.data = {
        'heading': 'Normal text',
        'para1': 'Lorem ipsum dolor sit amet, consectetur',
        'para2': 'adipiscing elit.'
      };
    }, 3000);
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

async presentActionSheet() {
  const myModal = await this.modalController.create({
    component: PopupComponent,
    cssClass:'add-booking-modal',
    showBackdrop:true,
    backdropDismiss:false,
  });
  return await myModal.present();
}

toggle2()
  {
  
    if(this.show_container_two==false)
    {
     this.show_container_two = true;
     this.icon_name_two = "caret-down-outline"
    }
    else
    {
      this.show_container_two = false;
      this.icon_name_two = "caret-up-outline"
    }
  }
  toggle()
  {
    if(this.show_container_one)
    {
     this.show_container_one = false;
     this.icon_name = "caret-up-outline"
    }
    else
    {
      this.show_container_one = true;
      this.icon_name = "caret-down-outline"
    }
  }
}
