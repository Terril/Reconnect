import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { LoadingController, ModalController, NavController } from "@ionic/angular";
import { element } from "protractor";
import { QRComponent } from "../../vouchers/qr/qr.component";
import { PassesService } from "../passes.service";
import { Storage } from '@ionic/storage-angular';
import { environment } from "src/environments/environment";
import { isEmpty } from "rxjs/operators";
import { IfStmt } from "@angular/compiler";

@Component({
    selector: 'app-purchased',
    templateUrl: './purchasedPasses.component.html',
    styleUrls: ['./purchasedPasses.component.css']
  })
  export class PurchasedPasses implements OnInit {
    loading: HTMLIonLoadingElement;
    passesList=[];
    title: any;
    color:any=["#7d7d7d","#c3c3c3","#7fd0ed","#dd9ca2" ];
  classcartOrder: any;
  userdata: any;
  item: any;
  img: any;
  iscomplimentry: any;
  weekend: any=[];
  weekday: any=[];
  show_container_one:boolean = true;
  icon_name = "chevron-down-outline";
  show_container_two:boolean = true;
  icon_name_two = "chevron-down-outline";
    constructor(
      private modalController:ModalController,
        private route: ActivatedRoute,
        private router: Router,
        private api: PassesService,
        private storage:Storage,
        public loadingController: LoadingController,
        public navCtrl: NavController) { }
    async ngOnInit(){
      
     
      await this.storage.create();
     this.storage.get("userdata").then(data=>{
    
       this.userdata=data;
       let memberId=this.userdata.role=="Member"?this.userdata.actualMemberId:this.userdata.MemberLogId
       if(this.item?.branchId!=undefined){
      this.getPassesList(memberId,this.item?.branchId)
    }
       
    });
      let cartorderString = localStorage.getItem('classcartDetails');
       this.classcartOrder = JSON.parse(cartorderString);
        this.loading = await this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Please wait...',
            duration: 2000
          });
          this.route.queryParams.subscribe(params => {
            
              const data= JSON.parse( params["passesList"])
              this.item = data;
              this.iscomplimentry = params["iscomplimentry"];
              this.img=environment.imageUrl;
             
             
           
         
           
          });
    }
    get_qrCode(item,flag)
    {
      let memberId=this.userdata.role=="Member"?this.userdata.actualMemberId:this.userdata.MemberLogId
     let terms="";
     terms = item?.TermsAndCondition;
      if(flag==0){
        this.loading.present();
        this.loading.hidden=false;
      
        this.api._getQrCode(0,memberId,this.userdata.role,"Standard").subscribe(data =>{
         this.loading.hidden=true;
         this.opn_qr(data,terms)
        
         })
      }else{

        this.loading.hidden=false;
        let VoucherName :string=item.VoucherName;
      
        this.api._getQrCode(item.DaypasspriceId,memberId,this.userdata.role,VoucherName.replace('"','')).subscribe(data =>{
         this.loading.hidden=true;
         this.opn_qr(data,terms)
        
         })
      }
     
     
    }
    async opn_qr(qr,terms)
    {
      
      const myModal = await this.modalController.create({
        component: QRComponent,
        cssClass:'qr-code-modal',
        showBackdrop:true,
        componentProps: { qr: qr,flag:0,terms:terms},
        backdropDismiss:false,
      });
      return await myModal.present();
    
    }
    async showQRSuccess()
    {
      
      const myModal = await this.modalController.create({
        component: QRComponent,
        cssClass:'qr-code-modal',
        showBackdrop:true,
        componentProps: { qr:null,flag:1},
        backdropDismiss:false,
      });
      return await myModal.present();
    }

    async showfailsQR()
    {
      
      const myModal = await this.modalController.create({
        component: QRComponent,
        cssClass:'qr-code-modal',
        showBackdrop:true,
        componentProps: { qr: null,flag:2},
        backdropDismiss:false,
      });
      return await myModal.present();
    }

    
    getcolor(item){
     
  
      return item.color;
  
      
    }
    cart()
    {
    this.router.navigate(['/cart'])
    }

    getPassesList(memberId,branchId){
      this.loading.present();
this.api._getRedeemPaaesList(memberId,branchId).subscribe(res=>{
let data:any=res;
this.weekday=data?.Weekday;
this.weekend=data?.Weekend;
this.loading.hidden=true;

})
}
toggle(flag)
{
  if(flag==1){
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
if(flag==2){
  if(this.show_container_two){
    this.show_container_two = false;
    this.icon_name = "chevron-up-outline"
  }else{
    this.show_container_two = true;
    this.icon_name = "chevron-down-outline"
  }
}
}
getpadding(item){
  if(item?.branchName=="RIVA"){
    return "15px";
  }
  if(item?.branchName=="TH8"){
    return "15px";
  }
  if(item?.branchName=="Movenpick"){
    return "15px";
  }
  

  
}

  }