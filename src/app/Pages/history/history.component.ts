import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AlertController,
  IonSlides,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { HistoryService } from './history.service';
import { Storage } from '@ionic/storage-angular';
import { PopupComponent } from '../classlisting/popup/popup.component';
import { Router } from '@angular/router';
import { QRComponent } from '../vouchers/qr/qr.component';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  data: any;
  monthname: any;
  sliderOne: any;
  selected_day: any;
  allDays = [];
  calenderData: any;
  slideOptions = {
    initialSlide: 26,
    slidesPerView: 5,
    autoplay: false,
  };
  current_month: any = new Date().getMonth();

  current_year = new Date().getFullYear();
  crrent_year :any =new Date().getFullYear();
  currentDate:any=new Date().getDate();
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  daysname = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  time = [
    '8:00',
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
  ];
  selectedSection = 1;
  icon_up = 'chevron-up-outline';
  icon_down = 'chevron-down-outline';
  loading: HTMLIonLoadingElement;
  userData: any;
  gymListing = [];
  classListing = [];
  selecteDate: any;
  mainList: any;
  toast: HTMLIonToastElement;
  toast2: HTMLIonToastElement;
  classcartOrder: any;
  constructor(
    public loadingController: LoadingController,
    private api: HistoryService,
    private storage: Storage,
    public modalController: ModalController,
    public toastController: ToastController,
    private router:Router,
    public alertController: AlertController,
  ) {
    this.storage.get('userdata').then((data) => {
      this.userData = data;
    });

    // this.slideWithNav.slideTo(21);
  }

  async ngOnInit() {
    let cartorderString = localStorage.getItem('classcartDetails');
    this.classcartOrder = JSON.parse(cartorderString);
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    
    });

    this.selected_day = this.currentDate;

    this.generate_calender(this.current_month);
    this.toast = await this.toastController.create({
      message: 'Cancel Successfully',
      position: 'top',
      duration: 2000,
    });
    this.toast2 = await this.toastController.create({
      message: 'OOPS!! Something Went Wrong',
      position: 'top',
      duration: 2000,
    });
  }
  toggle(selection) {
    this.selectedSection = selection;
  }
  ionViewWillEnter() {
    this.slideWithNav.slideTo(0);
    setTimeout(() => {
      this.getScheduleList();
    }, 1000);
  }

  next_month() {
    this.current_month = this.current_month + 1;

    if (this.monthNames.length > this.current_month) {
      this.selected_day = 1;
      this.generate_calender(this.current_month);
      this.slideWithNav.slideTo(0);
    }
  }
  load_date(obj) {
    this.monthname=obj.month;
    this.selected_day = obj.date;
    this.selecteDate = obj;

    this.filterLists();
  }

  generate_calender(month) {
    this.monthname = this.monthNames[month];
    this.allDays = [];

    
        var d = new Date();
        var daysInMonth =  d.getDate();
        let totalDays=new Date(this.crrent_year, month+1, 0).getDate();
        if(this.currentDate>=totalDays){
          daysInMonth = d.getDate();
          this.currentDate=this.currentDate-6;
        }
          
          let diff = totalDays-this.currentDate;
           
            daysInMonth=daysInMonth+diff;
            console.log(this.currentDate);
            if(diff){
              switch (diff){
                case 1 : this.currentDate=this.currentDate-5; 
                break;
                case 2 : this.currentDate=this.currentDate-4;
                break;
                case 3 : this.currentDate=this.currentDate-3;
                break;
                case 4 : this.currentDate=this.currentDate-2;
                break;
                case 5 : this.currentDate=this.currentDate-1;
                break;
                case 6 : this.currentDate=this.currentDate-0;
                break;
      
              }
           
            }
        // this.calenderData = { month_name: this.monthNames[daysInMonth] };
        // this.calenderData = this.allDays;
        // for (let d = this.currentDate; d <= daysInMonth; d++) {
        //   this.allDays.push({
        //     month: this.monthNames[
        //       new Date(this.current_year, month, d).getMonth()
        //     ],
        //     date: d,
        //     day_name: this.daysname[new Date(this.current_year, month, d).getDay()],
        //   });
        //   //  console.log(this.monthNames[new Date(2021, i, d).getMonth()]+""+ d+'<br>'+this.daysname[new Date(2021, i, d).getDay()])
        // }
        for(let i=0;i<7;i++){
          let tmpdate = new Date();
           tmpdate.setDate(tmpdate.getDate()+i);
           this.allDays.push({month:this.monthNames[tmpdate.getMonth()],date:tmpdate.getDate(),day_name:this.daysname[tmpdate.getDay()]});
          //console.log({month:this.monthNames[tmpdate.getMonth()],date:tmpdate.getDate(),day_name:this.daysname[tmpdate.getDay()]})
        }

    this.selecteDate =
      this.allDays.filter((x) => x.date == this.selected_day).length > 0
        ? this.allDays.filter((x) => x.date == this.selected_day)[0]
        : undefined;
  }
  getScheduleList() {
    this.loading.present();
    var MemberId=0;
    if(this.userData.role==null || this.userData.role==""||this.userData.role=="guest"){
      MemberId=this.userData.MemberLogId;
    }else{
   
      MemberId=this.userData.actualMemberId; 
   }
    this.api._getScheduleList(MemberId).subscribe((res) => {
      this.loading.hidden=true;
      this.mainList = res;
      this.gymListing = res?.gym;
      this.classListing = res?.classes;

     
      this.filterLists();
    });
  }

  filterLists() {
    const day =
      this.selecteDate.date < 10
        ? '0' + this.selecteDate.date
        : this.selecteDate.date;
    const selectedDate =
      day +
      '/' +
      this.getMonth(this.selecteDate.month) +
      '/' +
      this.current_year;
       


    this.gymListing = this.mainList?.gym.filter(
      (x) => x.GymbookingDate == selectedDate
    );
    this.classListing = this.mainList?.classes.filter(
      (x) => x.ClassGymDate == selectedDate
    );

  }

  getMonth(month) {
    switch (month) {
      case 'January':
        return '01';
      case 'February':
        return '02';
      case 'March':
        return '03';
      case 'April':
        return '04';
      case 'May':
        return '05';
      case 'June':
        return '06';
      case 'July':
        return '07';
      case 'August':
        return '08';
      case 'September':
        return '09';
      case 'October':
        return '10';
      case 'November':
        return '11';
      case 'December':
        return '12';
    }
  }

  deleteGymBooking(item) {
     
    this.loading.hidden=false
    this.api._deleteGymBooking(item.bookingId,this.userData.MailId).subscribe((res) => {
      this.loading.hidden=true;
      if (res == 'SUCCESS') {
        this.toast.present();
        this.getScheduleList();
      } else {
        this.toast2.present();
      }
    });
  }
  deleteClassBooking(item) {

    this.loading.hidden=false;
    this.api._deleteClassBooking(item.bookingId,this.userData.MailId).subscribe((res) => {
      this.loading.hidden=true;
      if (res == 'SUCCESS') {
        this.toast.present();
        this.getScheduleList();
      } else {
        this.toast2.present();
      }
    });
  }
  async presentActionSheet(item,flag) {
    let showText='Cancel Class schedule'
    if(flag==1){
      showText='Cancel Gym schedule'
    }
    const myModal = await this.modalController.create({
      component: PopupComponent,
      componentProps: { text: showText },
      cssClass:'add-booking-modal',
      showBackdrop:true,
      backdropDismiss:false,
    });
    myModal.onDidDismiss()
    .then((data) => {
      if(data.data.dismissed){
      if(flag==1){
        this.deleteGymBooking(item);
      }else{
        this.deleteClassBooking(item)
      }
    }
      
  });
  
    return await myModal.present();
  }
  cart()
  {
  this.router.navigate(['/cart'])
  }
  async openQr(card,flag){

    var MemberId=0;
    if(this.userData.role==null || this.userData.role==""||this.userData.role=="guest"){
      MemberId=this.userData.MemberLogId;
    }else{
   
      MemberId=this.userData.actualMemberId; 
   }
   if(flag==1){
    if(this.selecteDate?.date==new Date().getDate()){
      let temp:string= card?.GymendTime;
      let hr= +temp.split(":")[0];
      let min =+temp.split(":")[1];
      let result = this.fun2(hr,min);
      if(!result){
        
       let  alert = await this.alertController.create({
         cssClass: 'my-custom-class',
         message: 'This schedule is expired.',
         buttons: ['OK']
       });
       await alert.present();
        return
      }
     
    
   }
      this.loading.hidden=false;
     this.api._getQrCodeGym(MemberId,card.bookingId,card?.GymclassMasterId ).subscribe(res=>{
      this.loading.hidden=true;
      this.opn_qr(res,null)
     })
   }
   if(flag==2){
    if(this.selecteDate?.date==new Date().getDate()){
      let temp:string= card?.ClassEndTime;
      let hr= +temp.split(":")[0];
      let min =+temp.split(":")[1];
      let result = this.fun2(hr,min);
     
      if(!result){
       let  alert = await this.alertController.create({
         cssClass: 'my-custom-class',
         message: 'This schedule is expired.',
         buttons: ['OK']
       });
       await alert.present();
        return
      }
     
    
   }
    this.loading.hidden=false;
    this.api._getQrCodeClass(MemberId,card.bookingId,card?.classMasterId).subscribe(res=>{
     this.loading.hidden=true;
     this.opn_qr(res,null)
    })
   }  
  }
  async opn_qr(qr,terms)
  {
    const myModal = await this.modalController.create({
      component: QRComponent,
      cssClass:'qr-code-modal',
      showBackdrop:true,
      componentProps: { qr: qr,flag:0,terms: terms},
      backdropDismiss:false,
    });
    return await myModal.present();
  }
  fun2(hours,minutes){
    var startHour = hours;
    var startMinute = minutes;
    
   
    var endHour = new Date().getHours();
    var endMinute = new Date().getMinutes();
   
    //Create date object and set the time to that
    var startTimeObject = new Date();
    startTimeObject.setHours(startHour, startMinute, 0);
   
    //Create date object and set the time to that
    var endTimeObject = new Date(startTimeObject);
    endTimeObject.setHours(endHour, endMinute, 0);
   
    //Now we are ready to compare both the dates
    if(startTimeObject > endTimeObject)
    {
    //console.log('End time should be after start time.');
     return true;
    }
    else
    {
     //console.log('Entries are perfect.');
     return false;
    }
     }
     isHidden(card:any,flag:any){
       if(flag==2){
      if(this.selecteDate?.date==new Date().getDate()){
        let temp:string= card?.ClassEndTime;
        let hr= +temp.split(":")[0];
        let min =+temp.split(":")[1];
        let result = this.fun2(hr,min);
       
        if(!result){
          return true
        }
       }
      
     }
     if(flag==1){
      if(this.selecteDate?.date==new Date().getDate()){
        let temp:string= card?.GymendTime;
        let hr= +temp.split(":")[0];
        let min =+temp.split(":")[1];
        let result = this.fun2(hr,min);
        if(!result){
          
       
          return true
        }
       
      
     }
     }
        
         
     }
  
  
}
