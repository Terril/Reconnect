import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PassesService } from '../pasess/passes.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartInfo: any;
  grandTotal = 0;
  month=2;
  year=2021;
  creditCardNumber:any;
  creditCardName:any;
  creditCardCVV:any;
  creditCardExpDate:any;
  mindate: string;
  currentDate:any;
  maxdate: string;
  userData: any;
  loading: HTMLIonLoadingElement;

  constructor(
    private router:Router,
    private storage:Storage,
    private api: PassesService,
    public alertController: AlertController,
    public loadingController: LoadingController,) { }

 async ngOnInit(){
   
    await this.storage.create();
    this.storage.get("userdata").then(data=>{
     this.userData=data;  
   
    });
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000,
    });
    let cartinfostring=localStorage.getItem('cartInfo');
    this.cartInfo=JSON.parse(cartinfostring);
    this.gettotal();
    this.month = new Date().getMonth()+1;
 
    this.year=new Date().getFullYear();
    let day = new Date().getDate();
   
    this.mindate=this.year+"-"+this.month+"-"+day
    this.maxdate=(this.year+5)+"-"+this.month+"-"+day
    if(day<10 && this.month<10 ){
      this.mindate=this.year+"-"+"0"+this.month+"-"+"0"+day  
      this.maxdate=(this.year+5)+"-12"+"-"+"0"+day  
    }
    if( day<10 && this.month>=10){
      this.mindate=this.year+"-"+this.month+"-"+"0"+day
      this.maxdate=(this.year+5)+"-12"+"-"+"0"+day
    }
    if( day>=10 && this.month<10){
      this.mindate=this.year+"-"+"0"+this.month+"-"+day
      this.maxdate=(this.year+5)+"-12"+"-"+day
    }
   
  
   console.log("min",this.mindate)
   this.creditCardExpDate=this.month+"/"+this.year;
   
  }
  success()
  {
   this.router.navigate(['/success']);
  }
  gettotal(){
    
     this.cartInfo.forEach(item => {
      let total = item.Price*item.noofpasses;
      this.grandTotal = this.grandTotal+total;
    }); 
  }
  cc_format(event:any) {
    const value=event.detail.value;
   const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length > 0) {
      this.creditCardNumber = parts.join(' ');
    } else {
      this.creditCardNumber = value;
    }
  }
  async onCompletePayment(){
    let temp = [];
    this.cartInfo.forEach(element => {
      for(let i=0;i<element.noofpasses;i++){
        temp.push(element);
      }
    });
    let temprole = this.userData.role;
if(this.userData.role==null||this.userData.role==""){
temprole="guest";
}
    const obj={
      orderDetails:temp,
      cardName:this.creditCardName,
      cardNumber:this.creditCardNumber,
      cardCVV:this.creditCardCVV,
      cardExp:this.creditCardExpDate,
      memberId:this.userData.role=="Member"?this.userData.actualMemberId:this.userData.MemberLogId,
      memberRole:temprole,
      totalPrice:this.grandTotal,
      Date:new Date()

      
    }

  
    
    if(this.creditCardName==null || this.creditCardName==''){
      let  alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        message: 'Please Enter Card Name.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    
    if(this.creditCardNumber==null || this.creditCardNumber=='' || this.creditCardNumber?.length!=19){
      let  alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        message: 'Please Enter Valid Card Number.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    if(this.creditCardCVV==null || this.creditCardCVV=='' || this.check_cvv(this.creditCardCVV)!=true){
      let  alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        message: 'Please Enter Valid Card CVV.',
        buttons: ['OK']
      });
      await alert.present();

      return;
    }

    
    this.loading.present();
    this.api._makePayment(obj).subscribe(res=>{
      this.loading.dismiss()
     if(res=='Success'){
      this.success()
      localStorage.removeItem('cartInfo')
     }else{
       this.fail(res);
     }
    })
   
  }
  check_cvv(value){
   
    var numbers = /^[0-9]+$/;
    const reg = new RegExp('^\d+$')
     const matches = value?.match(numbers);
     if(matches!=null){
     return true;
    }else{
      return false;
    }
   }
  async fail(res){
    let  alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: res,
      buttons: ['OK']
    });
    await alert.present();

  }
}
