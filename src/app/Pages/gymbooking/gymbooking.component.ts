import { Component, OnInit, ViewChild } from '@angular/core';

import { AlertController, IonSlides, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { GymService } from 'src/app/Services/GymService.service';
import { PopupComponent } from '../classlisting/popup/popup.component';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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
  icon_name = "chevron-down-outline";
  show_container_two:boolean = false;
  icon_name_two = "chevron-down-outline";
  current_month:any = new Date().getMonth();
  crrent_year :any =new Date().getFullYear();
  currentDate:any=new Date().getDate();
  todaysDate :any=new Date().getDate();
  monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  daysname = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  time = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00','16:00'];
  active:any = 'time_name';
  activeIndex: number = 0;
  activaLayer:any=0;
  activatime:any;
  slideOptions = {
    initialSlide: 26,
    slidesPerView: 5,
    autoplay: false
  };
  branchesList: any;
  loading: HTMLIonLoadingElement;
  userData: any;
  timeslots=[];
  branchInfo:any;
  selectedtimeslot: any;
  selectedDate: any;
  toast: HTMLIonToastElement;
  toast2: HTMLIonToastElement;
  img: any;
  classcartOrder: any;

  constructor(public modalController: ModalController,
    public api:GymService, 
    public loadingController: LoadingController, 
    private storage:Storage,
    private router:Router,
    public alertController: AlertController,
    public toastController: ToastController) {

   }

  async ngOnInit(){
    let cartorderString = localStorage.getItem('classcartDetails');
    this.classcartOrder = JSON.parse(cartorderString);
    this.img=environment.imageUrl;

    this.storage.get("userdata").then(data=>{
      this.userData=data;  
     
     });
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    
    });
    this.toast = await this.toastController.create({
      message: 'Gym Booked  Successfully',
      position: 'top',
      duration: 2000
    });
    this.toast2 = await this.toastController.create({
      message: 'OOPS!! Something Went Wrong',
      position: 'top',
      duration: 2000
    });
    this.selected_day = this.currentDate;

    this.generate_calender(this.current_month);
    this.getbranches();
    
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
  select_branch(id,item)
  {
    this.activaLayer = id;
    this.show_container_two = true;
    this.icon_name_two = "chevron-down-outline"
    this.branchInfo = item;
 
    setTimeout(() => {
      if(this.slideWithNav!=undefined){
        this.slideWithNav.slideTo(-1)
    }
    },100);
   
  }

  select_time(id,item)
  {
   this.activatime = id;
   this.selectedtimeslot = item;
  
   
  }
  load_date(obj)
  {
    
    this.selected_day = obj.date;
  }


  
  generate_calender(month)
  {
   
    this.monthname = this.monthNames[month];
     this.allDays = [];


  // var d = new Date();

  // var daysInMonth =  d.getDate();
  // let totalDays=new Date(this.crrent_year, month+1, 0).getDate();
 
  // if(this.currentDate>=totalDays){
  //   daysInMonth = d.getDate();
  //   this.currentDate=this.currentDate-6;
  // }
    
  //   let diff = totalDays-this.currentDate;
     
  //     daysInMonth=daysInMonth+diff;
  //     console.log(this.currentDate);
  //     if(diff){
  //       switch (diff){
  //         case 1 : this.currentDate=this.currentDate-5; 
  //         break;
  //         case 2 : this.currentDate=this.currentDate-4;
  //         break;
  //         case 3 : this.currentDate=this.currentDate-3;
  //         break;
  //         case 4 : this.currentDate=this.currentDate-2;
  //         break;
  //         case 5 : this.currentDate=this.currentDate-1;
  //         break;
  //         case 6 : this.currentDate=this.currentDate-0;
  //         break;

  //       }
     
  //     }
  // this.calenderData = {month_name:this.monthNames[daysInMonth]};
  // this.calenderData = this.allDays;
  // for (let d = this.currentDate; d <= daysInMonth; d++) {
  //   this.allDays.push({month:this.monthNames[new Date(this.crrent_year,month, d).getMonth()],date:d,day_name:this.daysname[new Date(this.crrent_year,month, d).getDay()]});
   
  //  //  console.log(this.monthNames[new Date(2021, i, d).getMonth()]+""+ d+'<br>'+this.daysname[new Date(2021, i, d).getDay()])
  // }
  
  for(let i=0;i<7;i++){
    let tmpdate = new Date();
     tmpdate.setDate(tmpdate.getDate()+i);
     this.allDays.push({month:this.monthNames[tmpdate.getMonth()],date:tmpdate.getDate(),day_name:this.daysname[tmpdate.getDay()]});
    //console.log({month:this.monthNames[tmpdate.getMonth()],date:tmpdate.getDate(),day_name:this.daysname[tmpdate.getDay()]})
  }
 this.getslots(this.allDays[0]);
 
  }
  onSegmentChanged(event)
  {
    
  }
  onSegmentSelected(event)
  {
  
  }
 
  ionViewWillEnter() {

  }




  loadTime(id){
    this.sliderOne.lockSwipes(true);
  }
  onClickSlide(id) {
    this.activeIndex = id;
}

async presentActionSheet() {
  const myModal = await this.modalController.create({
    component: PopupComponent,
    componentProps: { text: 'Gym' },
    cssClass:'add-booking-modal',
    showBackdrop:true,
    backdropDismiss:false,
  });
  myModal.onDidDismiss()
  .then((data) => {
    if(data.data?.dismissed){
      this.bookGym()
    }
  
});

  return await myModal.present();
}

toggle2()
  {
  
    if(this.show_container_two==false)
    {
     this.show_container_two = true;
     this.icon_name_two = "chevron-down-outline"
    }
    else
    {
      this.show_container_two = false;
      this.icon_name_two = "chevron-up-outline"
    }
  }
    toggle()
    {
      if(this.show_container_one)
      {
      this.show_container_one = false;
      this.icon_name = "chevron-up-outline"
      }
      else
      {
        this.show_container_one = true;
        this.icon_name = "chevron-down-outline"
      }
    }
  getbranches(){
    this.loading.present();
    this.api._getBranches().subscribe(res=>{
     this.branchesList=res.BranchList;
     this.loading.hidden=true;
    });
  }
  bookGym(){
    this.loading.hidden=false;
    const selectedDate =this.crrent_year+"-"+this.getMonth(this.selectedDate.month)+"-"+this.selectedDate.date;
    const obj={
    email:this.userData.MailId,
    classMasterId:1,
    memberId: this.userData.role=="Member"?this.userData.actualMemberId:this.userData.MemberLogId,
    memberName:this.userData.Name,
    bookingDate:selectedDate,
    type:this.userData.role=="Member"?1:2,
    startTime:this.selectedtimeslot.TimeFrom,
    endTime:this.selectedtimeslot.TimeTo,
    branch:this.branchInfo.id
     }
     
     this.api.bookBranch(obj).subscribe(res=>{
      this.loading.hidden=true;
      if(res=='SUCCESS'){
        this.success();
      }else{
        this.toast2.present();
      }
     },error=>{
       
     })
  }

  getslots(item){
   
  this.monthname=item.month
  
    this.loading.present();
    const day=this.getDay(item.day_name)

    this.selectedDate=item;
    
    let selectdate =item.date;
    let currdate = new Date().getDate();
    

    this.api.getslots(day).subscribe(res=>{
      this.timeslots=[];
      
    
     if(selectdate!=currdate){
       this.timeslots=res;
     }else{ 
      this.timeslots=[];
      for(let i=0;i<res.length;i++){
        if(i==0){
         let result=this.fun2(8,30);
         if(result){
           let tmp= res[0];
           console.log(tmp);
           this.timeslots.push(tmp);
         }
        }
        if(i==1){
          let result= this.fun2(10,0);
          if(result){
            this.timeslots.push(res[1]);
          }
        }
        if(i==2){
          let result= this.fun2(11,30);
          if(result){
            this.timeslots.push(res[2]);
          }
        }
        if(i==3){
          let result= this.fun2(13,0);
          if(result){
            this.timeslots.push(res[3]);
          }
        }
        if(i==4){
          let result= this.fun2(14,30);
          if(result){
            this.timeslots.push(res[4]);
          }
        }
        if(i==5){
          let result= this.fun2(16,0);
          if(result){
            this.timeslots.push(res[5]);
          }
        }
        if(i==6){
          let result= this.fun2(17,30);
          if(result){
            this.timeslots.push(res[6]);
          }
        }
        if(i==7){
          let result= this.fun2(19,30);
          if(result){
            this.timeslots.push(res[7]);
          }
        }
        if(i==8){
          let result=  this.fun2(20,30);
          if(result){
            this.timeslots.push(res[8]);
          }
        }

        if(i==9){
          let result= this.fun2(22,0);
          if(result){
            this.timeslots.push(res[9]);
          }
        }      

      }
    }
     this.loading.hidden=true;
    })

  }

  getDay(day){
    switch(day){
 case 'Mon': return 'Monday';
 case 'Tue': return 'Tuesday';
 case 'Wed': return 'Wednesday';
 case 'Thu': return'Thursday';
 case 'Fri': return'Friday';
 case 'Sat': return 'Saturday';
 case 'Sun': return 'Sunday';

    }
  }

  getMonth(month){
    switch(month){
      
      case 'January': return '01'; 
      case 'February': return '02'; 
      case 'March': return '03'; 
      case 'April': return '04'; 
      case 'May': return '05'; 
      case 'June': return '06'; 
      case 'July': return '07'; 
      case 'August': return '08'; 
      case 'September': return '09'; 
      case 'October': return '10'; 
      case 'November': return '11'; 
      case 'December': return '12'; 
     

    }

  }
  getpadding(index){
    
    if(index.id!=2 ){
      return "15px";
    }
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
  success()
{
 this.router.navigate(['/success']);
}
async fail(){
  let  alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    message: 'Gym booking fail.',
    buttons: ['OK']
  });
  await alert.present();
 
 }
async checkdate(){
  let  alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    message: 'Past date booking not allowed.',
    buttons: ['OK']
  });
  await alert.present();
}
cart()
{
this.router.navigate(['/cart'])
}
}
