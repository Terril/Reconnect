import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { VouchersService } from '../vouchers/vouchers.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-voucher-redeem',
  templateUrl: './voucher-redeem.component.html',
  styleUrls: ['./voucher-redeem.component.scss'],
})
export class VoucherRedeemComponent implements OnInit {
  loading: HTMLIonLoadingElement;
  userData: any;
  vouchersList: any;
  cartInfo: any;
  classcartOrder: any;
  total: number;
  selectdVoucherCount: any;
  selectdVoucherId: any;

  constructor(
    private modalController:ModalController, 
    public navCtrl: NavController,
    private storage:Storage,
     private api:VouchersService,
     private router:Router,
     public alertController: AlertController,
     public loadingController: LoadingController
  ) { }

 async ngOnInit() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration:0
     
    });
    await this.storage.create();
    this.storage.get("userdata").then(data=>{
     this.userData=data; 
     this.get_listing(this.userData.Branch); 
    
    });
    let cartinfostring=localStorage.getItem('classcartInfo');
   
    this.cartInfo=JSON.parse(cartinfostring);
 
    let cartorderString = localStorage.getItem('classcartDetails');
    this.classcartOrder = JSON.parse(cartorderString);
    this.getTotal()

  }
  get_listing(Branch: any) {
    this.loading.present();
   this.api._getReddemVouchers().subscribe(res=>{
     console.log(res);
     this.vouchersList = res;
     this.loading.hidden=true;
   })
  }

  redeem(item){
    this.loading.hidden=false;
    this.selectdVoucherCount =item.voucherCount;
    this.selectdVoucherId=item.voucherId;
    this.onCompletePayment()
  }
  getTotal(){
    this.total=0;
    this.classcartOrder.forEach(element => {
      this.total = this.total+element.ClassFees;
    });
  }
  async onCompletePayment(){

    
    
    if(this.classcartOrder?.length>this.selectdVoucherCount){
      let  alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        message: 'Insufficent Vouchers to Redeem.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    let temparray =[];
    this.classcartOrder.forEach(element => {
      console.log(element);
      let obj={
                  ClassFees: element.ClassFees,
                  ClassMasterId: element.ClassMasterId,
                  ClassStartTime: element.ClassStartTime,
                  ClassTitle: element.ClassTitle,
                  TrainerName: element.TrainerName,
                  WeekDay: element.WeekDay,
                  image: element.image,
                  VoucherId:this.selectdVoucherId

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
    
      this.loading.dismiss()
     if(res=='SUCCESS'){
      this.success()
      localStorage.removeItem('classcartInfo')
      localStorage.removeItem('classcartDetails')
     }else{
      this.fail();
     
     }
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
