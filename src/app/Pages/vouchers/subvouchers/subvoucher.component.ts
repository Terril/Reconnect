import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingController, ModalController } from "@ionic/angular";
import { QRComponent } from "../qr/qr.component";
import { VouchersService } from "../vouchers.service";
import { Storage } from '@ionic/storage-angular';

@Component({
    selector: 'subvouchers',
    templateUrl: './subvoucher.component.html',
    styleUrls: ['./subvoucher.component.css']
  })
  export class SubVouchersComponent implements OnInit {
    loading: HTMLIonLoadingElement;
    voucherList:any;
  selectedVocuher: any;
  title="";
  color:any=["#7d7d7d","#c3c3c3","#7fd0ed","#dd9ca2" ];
  classcartOrder: any;
  userdata: any;
constructor(   private route: ActivatedRoute,
    private modalController:ModalController, 
     
    private api:VouchersService,
    private router:Router,
    private storage:Storage,
    public loadingController: LoadingController){

}
    async ngOnInit(){
      await this.storage.create();
    this.storage.get("userdata").then(data=>{
    
       this.userdata=data;
       
       
    });
      let cartorderString = localStorage.getItem('classcartDetails');
      this.classcartOrder = JSON.parse(cartorderString);
        this.loading = await this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Please wait...',
          
          });
          this.route.queryParams.subscribe(params => {
             this.selectedVocuher = JSON.parse( params["voucherList"])
             this.title=this.selectedVocuher.branchName
           
            });
            this.get_listing(this.selectedVocuher?.branchId,this.selectedVocuher?.voucherId)
    }
    get_listing(barnchId:any,VoucherId:any)
  {
    this.loading.present();
   this.api._getSubVoucherList(barnchId,VoucherId).subscribe(data =>{
    this.voucherList =  data;
    let index=0;
    this.voucherList.forEach(element => {
      if(index<4){
        element.color=this.color[index];
        index=index+1;
        if(index==4){
          index=0;
        }
      
      }
    });
    
    this.loading.hidden=true
    })
  }

  get_qrCode(item)
  {
    this.loading.hidden=false
    let VoucherName :string=item.voucherName;
    
   this.api._getQrCodeString(item.actualVoucherId,this.userdata.actualMemberId,this.userdata.role,VoucherName.replace('"','')).subscribe(data =>{
    this.opn_qr(data)
    this.loading.hidden=true;
    })
  }

  async opn_qr(qr)
  {
    const myModal = await this.modalController.create({
      component: QRComponent,
      cssClass:'qr-code-modal',
      showBackdrop:true,
      componentProps: { qr: qr },
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

  }