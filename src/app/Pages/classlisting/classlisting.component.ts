import { ClassListingService } from './classlisting.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, IonSlides, NavController } from '@ionic/angular';
import { ModalController,LoadingController } from '@ionic/angular';
import { CartComponent } from '../cart/cart.component';
import { PopupComponent } from './popup/popup.component';
import { element } from 'protractor';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { GymService } from 'src/app/Services/GymService.service';

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
  todaysDate :any=new Date().getDate();
  slideOptsThumbs = {
    slidesPerView: 2.9,
    spaceBetween:20,
    autoplay: false
  };
  crrent_year :any =new Date().getFullYear();
  currentDate:any=new Date().getDate();
  current_month:any = new Date().getMonth();
  slideOptions = {
    initialSlide: 26,
    slidesPerView: 5,
    autoplay: false
  };

  categories=[];
  classListarray:any;
  classListingDataHolder= [];
  
   monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  daysname = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  list: any[] = new Array(5);
  selectedDate: any;
 
  seletcted_Day: string;
  selectedposition=0;

  selectedClassType: any;
  color:any=["#20988f","#f59b5f","#bf6161","#dd9ca2" ];
 obj={
  CategoryName:"All",
  WeekDay:"All",
  CategoryClassList:[],
  ImagesFiles:"/UploadedFiles/2021_ 10_ 09_ 11_ 58_ 09Reconnect_Aqua.png"
  
  }
  img: any;
  backgroundUrl: string;
  classcartOrder: any;
  avilabletext: string;
  classCategory: any=[];
  branchesList: any=[];

  constructor(public modalController: ModalController,
    private router:Router,
    private api:ClassListingService,
    public gymservice:GymService,
    public loadingController: LoadingController,
    private domSanitizer: DomSanitizer,
    public alertController: AlertController,
    public navCtrl: NavController) { 
   }
   
  active:any = 'time_name';
  activeIndex: number = 0;
  loading:HTMLIonLoadingElement;
  async ngOnInit(){
    this.getbranches();
    let cartorderString = localStorage.getItem('classcartDetails');
    this.classcartOrder = JSON.parse(cartorderString);
    this.img=environment.imageUrl;
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    this.selected_day =this.currentDate;
    this.generate_calender(this.current_month);

    this.getClassCategory();
    
  }


 
  load_clasess(id,item)
  {
   this.selectedposition = id;

    this.loading.present();
    this.classListingDataHolder = [];
    this.selectedClassType=item;
 
    this.loading.dismiss();
    // setTimeout(() => {
    //   if(this.slideWithNav!=undefined)
    //   this.slideWithNav.slideTo(this.selected_day-1)
    // }, 1000);
 
    this.getDayWiseClasss();

  }
  seletctedDay(day){
    
    this.seletcted_Day=this.getDay(day);
    

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
    this.monthname=obj.month;
    this.selected_day = obj.date;
    this.selectedDate=obj;
    this.getDayWiseClasss();
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
      // let diff = totalDays-this.currentDate;
     
      // daysInMonth=daysInMonth+diff;
      // console.log(this.currentDate);
      // if(diff){
      //   switch (diff){
      //     case 1 : this.currentDate=this.currentDate-5; 
      //     break;
      //     case 2 : this.currentDate=this.currentDate-4;
      //     break;
      //     case 3 : this.currentDate=this.currentDate-3;
      //     break;
      //     case 4 : this.currentDate=this.currentDate-2;
      //     break;
      //     case 5 : this.currentDate=this.currentDate-1;
      //     break;
      //     case 6 : this.currentDate=this.currentDate-0;
      //     break;

      //   }
     
      // }
    
    
    
      // this.calenderData = {month_name:this.monthNames[daysInMonth]};
    
      // this.calenderData = this.allDays;
      // for (let d = this.currentDate; d <= daysInMonth; d++) {
      //   this.allDays.push({month:this.monthNames[new Date(this.crrent_year, month, d).getMonth()],date:d,day_name:this.daysname[new Date(this.crrent_year, month, d).getDay()]});
      //  //  console.log(this.monthNames[new Date(2021, i, d).getMonth()]+""+ d+'<br>'+this.daysname[new Date(2021, i, d).getDay()])
      // }
      for(let i=0;i<7;i++){
        let tmpdate = new Date();
         tmpdate.setDate(tmpdate.getDate()+i);
         this.allDays.push({month:this.monthNames[tmpdate.getMonth()],date:tmpdate.getDate(),day_name:this.daysname[tmpdate.getDay()]});
        //console.log({month:this.monthNames[tmpdate.getMonth()],date:tmpdate.getDate(),day_name:this.daysname[tmpdate.getDay()]})
      }
   this.selectedDate = this.allDays.filter(x=>x.date == this.selected_day).length>0?this.allDays.filter(x=>x.date == this.selected_day)[0]:undefined;

 
  }
  onSegmentChanged(event)
  {
    
  }
  onSegmentSelected(event)
  {
  
  }
 
  ionViewWillEnter() {
    setTimeout(() => {
      if(this.slideWithNav!=undefined)
      this.slideWithNav.slideTo(0)
    },500);
  
  }


  getbranches(){
    this.gymservice._getBranches().subscribe(res=>{
     this.branchesList=res.BranchList;
     
    });
  }

  loadTime(id){
    this.sliderOne.lockSwipes(true);
  }
  onClickSlide(id) {
    this.activeIndex = id;
}

 async booking(item) {
  if(item?.AvailableSeats<=-3){
    let  alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Can not book class as already full.',
      buttons: ['OK']
    });
    await alert.present();
   return;
  }

if(this.selectedDate?.date==new Date().getDate()){
   let temp:string= item?.ClassStartTime;
   let hr= +temp.split(":")[0];
   let min =+temp.split(":")[1];
   let result = this.fun2(hr,min);
   if(!result){
    let  alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Can not book class for already passed time.',
      buttons: ['OK']
    });
    await alert.present();
     return
   }
  
 
}

   if(this.selectedDate==null || this.selectedDate==undefined){
     return ;
   }
   
  const selectedDate =this.crrent_year+"-"+this.getMonth(this.selectedDate.month)+"-"+this.selectedDate.date;
   
   let details: NavigationExtras = {
    queryParams: {
      gymDetails:JSON.stringify(item),
      selectdDate:selectedDate,
      classType: JSON.stringify(item),
      selectedDay:this.seletcted_Day,
    }
}

this.navCtrl.navigateForward(['/details/'+1],details);
  
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
getFilteredClass(){

  this.selectedClassType= this.classCategory[0];
  this.getDayWiseClasss();
 
}
getDayWiseClasss(){
  this.classListingDataHolder=[];
  let tempList =[];
 
  if(this.selectedClassType.CategoryName=="All"){
    var weekDay=this.getDay(this.selectedDate.day_name);
    
    tempList=this.selectedClassType.CategoryClassList.filter(x=>x.WeekDay?.trim()==weekDay.trim());
  }
  if(this.selectedClassType.CategoryClassList.length>0 && this.selectedClassType.CategoryClassList!="All"){
    var weekDay=this.getDay(this.selectedDate.day_name);
 
    tempList=this.selectedClassType.CategoryClassList.filter(x=>x.WeekDay?.trim()==weekDay.trim());
  }
  
  let index=0;
  tempList.forEach(element => {
      if(index<4){
        element.color=this.color[index];
        index=index+1;
        if(index==4){
          index=0;
        }
      
      }
    });

    if(this.selectedDate?.date==new Date().getDate()){
      tempList.forEach(item=>{
        let temp:string= item?.ClassStartTime;
        let hr= +temp.split(":")[0];
        let min =+temp.split(":")[1];
        let result = this.fun2(hr,min);
        if(result){
        this.classListingDataHolder.push(item);
        }
      })

     
    
   }else{
     this.classListingDataHolder=tempList;
   }
 
}
getImage(item){
    if(item.ClassTitle=="All"){
      return "../../../assets/banner-bg.jpg"
    }else{
    
      return this.img+item.ImagesFiles;
    
  }
  
}
getcolor(item){
  this.avilabletext="";
  if(item?.AvailableSeats>-3){
    this.avilabletext="Available"
    return "#20988f";
    
  }
  if(item?.AvailableSeats<=-3){
    this.avilabletext="Full"
    return "#bf6161";
  }
  if(item?.AvailableSeats==0){
    this.avilabletext="Waitlist"
    return "#f59b5f";
  }

 

  
}
cart()
{
this.router.navigate(['/cart'])
}

getClassCategory(){

  this.loading.present();
  this.api._getClassCategorys().subscribe(res=>{
    if(res?.length>0){
    this.classCategory.push(res[res?.length-1])  
     for(let i=0;i<res?.length-1;i++){
       this.classCategory.push(res[i]);
     
  } 
    }
   this.getFilteredClass();
   this.loading.dismiss();
    
  })
}
getBranchName(item){
  let name="";
  let branchName = this.branchesList?.filter(x=>x.id==item.Branch);
  if(branchName.length>0){
    name= branchName[0]?.branchName;
   
  }
  
  return name;
  
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


}
