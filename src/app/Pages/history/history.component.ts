import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  data: any;
  monthname:any;
  sliderOne: any;
  selected_day:any;
  allDays = [];
  calenderData:any;
  slideOptions = {
    initialSlide: 26,
    slidesPerView: 5,
    autoplay: false
  };
  current_month:any = new Date().getMonth();
  monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  daysname = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  time = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00','16:00'];
  constructor() { 

   // this.slideWithNav.slideTo(21);
  }

  ngOnInit(): void {

    this.selected_day = 21;
  
    this.generate_calender(this.current_month);
   
  }
  ionViewWillEnter() {
    this.slideWithNav.slideTo(this.selected_day-1)
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
  }

}
