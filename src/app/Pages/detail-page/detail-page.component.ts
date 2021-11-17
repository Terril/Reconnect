import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { PophoverComponent } from './pophover/pophover.component';
import { PopupComponent } from '../classlisting/popup/popup.component';
import { ClassListingService } from '../classlisting/classlisting.service';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { GymService } from 'src/app/Services/GymService.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {
  condition: number = 2;
  list: any[] = new Array(5);
  details: any;
  selectedDate: any;
  toast: HTMLIonToastElement;
  loading: HTMLIonLoadingElement;
  userData: any;
  classType: any;
  selectedDay: any;
  toast2: HTMLIonToastElement;
  img: any;
  date: any;
  branchesList: any=[];
  constructor(public popoverController: PopoverController,
    private location: Location,
    private router:Router,
    private navCtrl: NavController,
    private modalController:ModalController,
    private route: ActivatedRoute,
    private storage:Storage,
    public toastController: ToastController,
    public loadingController: LoadingController, 
    public gymservice:GymService,
    private api:ClassListingService,) { }

  async ngOnInit() {
    this.getbranches();
    this.img=environment.imageUrl;
    this.storage.get("userdata").then(data=>{
      this.userData=data;  
     
     });
    this.route.queryParams.subscribe(params => {
    this.details = JSON.parse( params["gymDetails"])
    this.selectedDate = params["selectdDate"]
    this.classType=JSON.parse(params["classType"]);
    this.selectedDay=params["selectedDay"];
   

  });
  this.toast = await this.toastController.create({
    message: 'Class Booked  Successfully',
    position: 'top',
    duration: 2000
  });
  this.toast2 = await this.toastController.create({
    message: 'OOPS!! Something Went Wrong',
    position: 'top',
    duration: 2000
  });
  this.loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Please wait...',
    duration: 2000,
  });
  }
  back()
  {
    this.navCtrl.pop();
    
  }
  addCart()
  {
    this.setAllDetails();
    const obj ={
      ClassMasterId:this.details.ClassMasterId,
      ClassTitle:this.details.ClassTitle,
      TrainerName:this.details.TrainerName,
      WeekDay:this.details.WeekDay,
      ClassStartTime:this.details.ClassStartTime,
      ClassFees:this.details.ClassFees,
      image:this.details.ImagesFiles
    }
    var data = localStorage.getItem("classcartDetails");
    if(data!=undefined){
      const details = JSON.parse(data);
    
     details.push(obj);
      localStorage.setItem('classcartDetails',JSON.stringify(details));
    }else{
      const data =[];
         data.push(obj)
      localStorage.setItem('classcartDetails',JSON.stringify(data));
    }

    

    this.router.navigate(['/cart']);
  }
  addwish()
  {
    this.router.navigate(['/tablinks/wishlist']);
  }
  booking()
  {
    this.router.navigate(['/booking/1'])
  }

  async presentActionSheet() {
    const myModal = await this.modalController.create({
      component: PopupComponent,
      componentProps: { text: 'Class' },
      cssClass:'add-booking-modal',
      showBackdrop:true,
      backdropDismiss:false,
    });
    myModal.onDidDismiss().then((data)=>{
   
      if(data.data?.dismissed){
      this.bookclass();
    }
    })
    return await myModal.present();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PophoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }

  bookclass(){
   
    this.loading.present();
    const obj ={
      ClassMasterId:this.details.ClassMasterId,
      ClassTitle:this.details.ClassTitle,
      TrainerName:this.details.TrainerName,
      WeekDay:this.details.WeekDay,
      ClassStartTime:this.details.ClassStartTime,
      ClassFees:this.details.ClassFees
    }
    var data = localStorage.getItem("classcartDetails");
    if(data!=undefined){
      const details = JSON.parse(data);
     details.push(obj);
      localStorage.setItem('classcartDetails',JSON.stringify(details));
    }else{
      const data =[];
         data.push(obj)
      localStorage.setItem('classcartDetails',JSON.stringify(data));
    }
  this.setAllDetails();
  
    this.router.navigate(['/classCheckout']);
 
  }
  setAllDetails(){
    const cartdetails = {
      classMasterId: this.details.ClassMasterId,
      memberId:this.userData.role=="Member"?this.userData.actualMemberId:this.userData.MemberLogId,
      memberName:this.userData.Name,
      email:this.userData.MailId,
      type:this.userData.role=="Member"?1:2,
      branch:this.details.Branch,
      EndTime:this.details.ClassStartTime,
      WeekDay:this.details.WeekDay,
      GymDate:this.selectedDate,
      ClassTitle:this.details.ClassTitle,
      ClassStartTime:this.details.ClassStartTime,
      ClassFees:this.details.ClassFees

    }
    localStorage.setItem('classcartInfo', JSON.stringify(cartdetails));
  }
  getbranches(){
    this.gymservice._getBranches().subscribe(res=>{
     this.branchesList=res.BranchList;
     this.getBranchName();
    });
  }
  getBranchName(){
    this.details.branchName="";
    let branchName = this.branchesList?.filter(x=>x.id==this.details.Branch);
    if(branchName.length>0){
      this.details.branchName= branchName[0]?.branchName;
     
    }
    
   
    
  }
}
