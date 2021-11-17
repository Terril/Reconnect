import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { VouchersService } from '../vouchers/vouchers.service';
import { Storage } from '@ionic/storage-angular';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  classOrder: any=[];
  total: number;
  img: any;
  loading: HTMLIonLoadingElement;
  redeemVouchercout: any=0;
  userData: any;
  cartInfo: any;

  constructor( private router:Router,
    private modalController:ModalController, 
    public navCtrl: NavController,
    private storage:Storage,
    private api:VouchersService,
    public alertController: AlertController,
    public loadingController: LoadingController) { }

  async ngOnInit(){
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration:0
     
    });
   
    await this.storage.create();
    this.storage.get("userdata").then(data=>{
     this.userData=data; 
  
    });
    this.get_listing();
    let cartinfostring=localStorage.getItem('classcartInfo');
   this.cartInfo=JSON.parse(cartinfostring);
  this.img=environment.imageUrl;
  let data = localStorage.getItem("classcartDetails");
  this.classOrder = JSON.parse(data);
  
  this.getTotal();
  }
getTotal(){
  this.total=0;
  this.classOrder?.forEach(element => {
    this.total = this.total+element.ClassFees;
  });
}
removeitem(index){
  this.classOrder.splice(index,1);
  localStorage.setItem("classcartDetails",JSON.stringify(this.classOrder));
  this.getTotal();
}
checkout(){
  this.router.navigate(['/classCheckout']);
}
redeemVoucher(){
  this.onCompletePayment();
 
}
get_listing() {
 this.loading.present();
 this.api._getReddemVouchers().subscribe(res=>{
  let total =0;
  res?.forEach(element => {
    total = total+element.voucherCount;
   });
 this.redeemVouchercout = total;
 this.loading.hidden=true;
  
 })
}
async onCompletePayment(){

    
    
  if(this.classOrder?.length>this.redeemVouchercout){
    let  alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Insufficent Vouchers to Redeem.',
      buttons: ['OK']
    });
    await alert.present();
    return;
  }
  this.loading.hidden=false;
  let temparray =[];
  this.classOrder.forEach(element => {
  
    let obj={
                ClassFees: element.ClassFees,
                ClassMasterId: element.ClassMasterId,
                ClassStartTime: element.ClassStartTime,
                ClassTitle: element.ClassTitle,
                TrainerName: element.TrainerName,
                WeekDay: element.WeekDay,
                image: element.image,
             
                }

    temparray.push(obj);
   
 
});

  const obj={
    cardName:"",
    cardNumber:"",
    cardCVV:"",
    cardExp:"",
    memberId:this.userData.role=="Member"?this.userData.actualMemberId:this.userData.MemberLogId,
    memberRole:this.userData.role,
    memberName:this.userData.Name,
    email:this.userData.MailId,
    type:this.userData.role=="Member"?1:2,
    branch:this.cartInfo.branch,
    classOrderDetails:temparray,
    GymDate:this.cartInfo.GymDate,
    totalPrice:this.total,
    PaymentStatus:"Complete",
    ModeofPayment:"RedeemVoucher",
    ReferenceNo:"112122"

    
  }
  

  this.api._bookClass(obj).subscribe(res=>{
    this.loading.hidden=true;
   if(res=='SUCCESS'){
    localStorage.removeItem('classcartInfo')
    localStorage.removeItem('classcartDetails')
    this.success()
  
   }else{
    this.fail();
   
   }
  },error=>{
    console.log(error);
    this.loading.hidden=true;
  })
 
}
success()
{
 this.router.navigate(['/success']);
}
 async fail(){
  let  alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    message: 'Insufficent Vouchers to Redeem.',
    buttons: ['OK']
  });
  await alert.present();
  this.router.navigate(['/cart']); 
 }

}
