import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { QRComponent } from '../vouchers/qr/qr.component';
import { PassesService } from './passes.service';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pasess',
  templateUrl: './pasess.component.html',
  styleUrls: ['./pasess.component.css']
})
export class PasessComponent implements OnInit {
  show_container_one:boolean = true;
  icon_name = "chevron-down-outline";
  show_container_two:boolean = true;
  icon_name_two = "chevron-down-outline";
  loading: HTMLIonLoadingElement;
  purchasedList: any;
  classcartOrder: any;
  userdata: any;
  compimentarydayPasses: any;
  img: any;
  constructor(private router:Router,private modalController:ModalController,
    public loadingController: LoadingController, 
    public navCtrl: NavController,
    private storage:Storage,
    private api: PassesService,) { }

  async ngOnInit() {
    this.img=environment.imageUrl;
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    
    });
    await this.storage.create();
    this.storage.get("userdata").then(data=>{
     this.userdata=data;
    let memberId=this.userdata.role=="Member"?this.userdata.actualMemberId:this.userdata.MemberLogId
      this.getDayPasses(memberId);
    });
    let cartorderString = localStorage.getItem('classcartDetails');
    this.classcartOrder = JSON.parse(cartorderString);
    
   
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

  pucrchase(item)
  {
    let details: NavigationExtras = {
      queryParams: {
        passesList:JSON.stringify(item),
       
      }
  }
 this.navCtrl.navigateForward(['/pasess/purchae'],details);
   
  }

  getDayPasses(memberId){
    this.loading.present();
    this.api._getPurchesedDayPasses(memberId).subscribe(res=>{
      let data:any = res;
      this.compimentarydayPasses = data.complementryDayPasses;
      this.purchasedList = data.purchaseDayPasses;
      
      this.loading.dismiss();
    })

  }
  moveTopassesList(item,iscomplimentry){
    let details: NavigationExtras = {
      queryParams: {
        passesList:JSON.stringify(item),
        iscomplimentry:iscomplimentry
       
      }
  }
 this.navCtrl.navigateForward(['/pasess/passesList'],details);
  }
  getpadding(index){
    if(index!=1){
      return "15px";
    }
    
 
    
  }
  cart()
  {
  this.router.navigate(['/cart'])
  }
  
}
