import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PassesService } from '../pasess/passes.service';

@Component({
  selector: 'app-classbooking',
  templateUrl: './classbooking.component.html',
  styleUrls: ['./classbooking.component.scss'],
})
export class ClassbookingComponent implements OnInit {
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

  condition: number = 2;
  classcartOrder=[];
  total: number;
  paymentUrl="http://rokdobaltd-001-site13.ftempurl.com/payment_form.aspx?"

  constructor( private router:Router, 
    private storage:Storage,  
    private api: PassesService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private iab: InAppBrowser) { }

 async ngOnInit() {
    await this.storage.create();
    this.storage.get("userdata").then(data=>{
     this.userData=data;  
    
    });
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000,
    });
    let cartinfostring=localStorage.getItem('classcartInfo');
   
    this.cartInfo=JSON.parse(cartinfostring);
 
    let cartorderString = localStorage.getItem('classcartDetails');
    this.classcartOrder = JSON.parse(cartorderString);
    this.getTotal()

    
   
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
   
  
  
   this.creditCardExpDate=this.month+"/"+this.year;
  }
  ionViewWillEnter() {
    let cartinfostring=localStorage.getItem('classcartInfo');
   
    this.cartInfo=JSON.parse(cartinfostring);
 
  
  }
  detail_page():void
  {
    this.router.navigate(['/details/1'])
  }
  success()
  {
   this.router.navigate(['/success']);
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

  
    const obj={
      cardName:this.creditCardName,
      cardNumber:this.creditCardNumber,
      cardCVV:this.creditCardCVV,
      cardExp:this.creditCardExpDate,
      memberId: this.userData.role=="Member"?this.userData.actualMemberId:this.userData.MemberLogId,
      memberRole:this.userData.role,
      memberName:this.userData.Name,
      email:this.userData.MailId,
      type:this.userData.role=="Member"?1:2,
      branch:this.cartInfo.branch,
      classOrderDetails:this.classcartOrder,
      GymDate:this.cartInfo.GymDate,
      totalPrice:this.total,
      PaymentStatus:"Complete",
      ModeofPayment:"Card",
      ReferenceNo:"112122"
 }
    let refno=Math.random().toString(36).substr(2, 8)
    let amount=this.total
    let memberId=this.userData.role=="Member"?this.userData.actualMemberId:this.userData.MemberLogId;
 
   let finalUrl=this.paymentUrl+"refno="+refno+"&amount="+amount+"&memberId="+memberId;
     


    const options: InAppBrowserOptions = {
      zoom: 'yes',
      hideurlbar:'yes',
      closebuttoncaption:'Close',


    }
   
    const browser = this.iab.create(finalUrl,'_self',options);
   

     browser.on('exit').subscribe(event => {
      this.api._getPaymentSuccessFail(memberId,refno).subscribe(res=>{
       if(res=='SUCCESS'){
         obj.ReferenceNo=refno;
         obj.PaymentStatus="Complete"
        this.bookClass(obj)
       }else{
         this.fail(res);
       }
      })
      
   })
  }
  getTotal(){
    this.total=0;
    this.classcartOrder.forEach(element => {
      this.total = this.total+element.ClassFees;
    });
  }
  async fail(res){
    let  alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: "Payment is Fail. Please try again",
      buttons: ['OK']
    });
    await alert.present();

  }

  bookClass(obj:any){
    this.loading.present();
    this.api._bookClass(obj).subscribe(res=>{
    this.loading.dismiss()
     if(res=='SUCCESS'){
      this.success()
      localStorage.removeItem('classcartInfo')
      localStorage.removeItem('classcartDetails')
     }else{
       this.fail(res);
     }
    })
  }
}
