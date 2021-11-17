import { Component, OnInit } from '@angular/core';
import { QRComponent } from './qr/qr.component';
import { VouchersService } from './vouchers.service';
import { ModalController,LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.css']
})
export class VouchersComponent implements OnInit {
  show_container_one:boolean = true;
  icon_name = "chevron-down-outline";
  list: any[] = new Array(5);
  condition: number = 2;
  slideOptsThumbs = {
    slidesPerView: 2.9,
    spaceBetween:6 
  };
  loading:any;
  vouchersList:any;
  allVoucherList: any[];

  color:any=["#7d7d7d","#c3c3c3","#7fd0ed","#dd9ca2" ];
  userData: any;
  classcartOrder: any;
  totalcount: any=0;
  branchname: any;
  constructor(
    private modalController:ModalController, 
    public navCtrl: NavController,
    private storage:Storage,
     private api:VouchersService,
     private router:Router,
     public loadingController: LoadingController) { }

 async ngOnInit(){
   let cartorderString = localStorage.getItem('classcartDetails');
    this.classcartOrder = JSON.parse(cartorderString);
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
     
    });
    await this.storage.create();
    this.storage.get("userdata").then(data=>{
     this.userData=data; 
     if(this.userData.role==null || this.userData.role==""||this.userData.role=="guest"){

     }else{
    
     this.get_listing(this.userData.Branch,this.userData.actualMemberId); 
    }
     
    
    });
 
  }

 
  get_listing(barnch:any,memberId)
  {
    this.loading.present();
 
   this.api._getVoucherList(barnch,memberId).subscribe(data =>{
    let tmpdata =  data;
 
   this.vouchersList =[];
   
   tmpdata.forEach(element => {
        this.totalcount = this.totalcount+element.voucherCount;
        this.branchname = element.branchName;
        var isPresent = this.vouchersList.filter(x=>x.voucherId==element.voucherId);
        if(isPresent.length>0){
           let count = isPresent[0].voucherCount+element.voucherCount;
           isPresent[0].voucherCount = count;
           isPresent[0].TermsAndCondition= element.TermsAndCondition!==null || element.TermsAndCondition!==""?element.TermsAndCondition:isPresent[0].TermsAndCondition;
        }else{
        let obj = {
          voucherName:element.voucherName,
          voucherCount:element.voucherCount,
          TermsAndCondition:element.TermsAndCondition,
          branchId:element.branchId,
          branchName:element.branch,
          voucherId:element.voucherId
          
        }
        this.vouchersList.push(obj);
      }
    
    });
    console.log(this.vouchersList);
    this.loading.hidden=true;
   
 
  })
  }
  get_qrCode(item)
  {
   
    this.loading.hidden=false;
   let VoucherName :string=item.voucherName;
   let terms = item.TermsAndCondition;

   this.api._getQrCodeString(item.voucherId,this.userData.actualMemberId,this.userData.role,VoucherName.replace('"','')).subscribe(data =>{
    this.loading.hidden=true;
    this.opn_qr(data,terms)
   
    })
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


 
  moveTopassesList(item){
    let details: NavigationExtras = {
      queryParams: {
        voucherList:JSON.stringify(item)
       
      }
  }
  this.navCtrl.navigateForward(['/vouchers/voucherList'],details);
  }
  getcolor(item){
   

    return item.color;
   
  }
  cart()
{
this.router.navigate(['/cart'])
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
 
}
