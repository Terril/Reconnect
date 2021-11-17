import { PassesService } from './../passes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})
export class PurchaseComponent implements OnInit {
  loading: any;
  passesList = [];
  fiarmountSelectedDays = '';
  rivapalmSelectedDays = '';
  rivanewSelectedDays = '';
  montezSelectedDays = '';

  currentStep: any;
  filteredList: any;
  cartList = [];
  branchList: any[];
  typeList=[];
  title: any;
  item: any;
  img: any;
  MainList:  any[];
  cartData: any;
  toast: HTMLIonToastElement;
  constructor(
    private router: Router,
    private api: PassesService,
    private route: ActivatedRoute,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {}

  async ngOnInit() {
    let cartorderString = localStorage.getItem('passesCartItems');
    this.cartData = JSON.parse(cartorderString);
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000,
    });
    this.route.queryParams.subscribe(params => {
            
      const data= JSON.parse( params["passesList"])
      this.item = data
      this.img=environment.imageUrl;
      console.log(data);
     this.passesList = data.branch?.dayPasses;
     this.get_listing(this.item.branchId);
 
   
  });


  }

  get_listing(branchId) {
    this.loading.present();
    this.api._getDayPassesList(branchId).subscribe((data) => {
      this.passesList = [];
      this.MainList= data.DayPassList;
   
     
      this.loading.dismiss();
    });
  }

  _checkOut() {
    const carddetails = this.cartList.filter((x) => x.noofpasses != 0);
    localStorage.setItem('cartInfo', JSON.stringify(carddetails));
   
    this.router.navigate(['/checkout']);
  }
  _toggle(currentStep,item) {
    this.currentStep = currentStep;
    this.getSelectedDays(item);
  }
  getSelectedDays(item) {
  
    this.filteredList = this.passesList.filter(
      (x) => x.branchId == item.item.branchId && x.days == item.selectdDay && x.VoucherName==item.selectedType
    );
  
  }
  getSelectedTypes(item) {
   let list= this.passesList.filter(
      (x) => x.branchId == item.item.branchId && x.days == item.selectdDay
    );
  
    if(list.length>0){
      list.forEach(ele=>{
        const obj={
          display:ele.VoucherName,
          value:ele.VoucherName,
        }
        let isPresent = this.typeList.filter(x=>x.display==ele.VoucherName);
        if(isPresent.length==0){
          this.typeList.push(obj);
        }
      
      })
    }
   
   
  }
  addtoCartItem(item) {
   
    let noofcards = this.getno(item);
    noofcards = noofcards + 1;
    const obj = {
      branchId: item.branchId,
      DaypasspriceId: item.DaypasspriceId,
      days: item.days,
      Type: item.VoucherName,
      Price: item.Price,
      branchName: item.branchName,
      noofpasses: noofcards,
      isRadioCheckd:false
    };
    let isPresent = this.cartList.filter(
      (x) => x.DaypasspriceId == item.DaypasspriceId 
    );
    if (isPresent.length > 0) {
      isPresent[0].noofpasses = noofcards;
    
    } else {
      this.cartList.push(obj);
    }
    
  }
  removefromCartItem(item) {
    let noofcards = this.getno(item);
    noofcards = noofcards - 1;
    if (noofcards <= 0) noofcards = 0;
    const obj = {
      branchId: item.branchId,
      DaypasspriceId: item.DaypasspriceId,
      days: item.days,
      Type: item.VoucherName,
      Price: item.Price,
      branchName: item.branchName,
      noofpasses: noofcards,
      isRadioCheckd:false
    };
    let isPresent = this.cartList.filter(
      (x) => x.DaypasspriceId == item.DaypasspriceId 
    );
    if (isPresent.length > 0) {
      isPresent[0].noofpasses = noofcards;
    
    } else {
     
      this.cartList.push(obj);
     
    }
  }
  getno(item) {
    let cart = this.cartList.filter(
      (x) => x.DaypasspriceId == item.DaypasspriceId  
    );
    if (cart.length > 0) {
      return cart[0].noofpasses;
    } else {
      return 0;
    }
  }
  getiscarthavepasses() {
    let total = 0;
    this.cartList.forEach((element) => {
      total = total + element.noofpasses;
    });
    return total;
  }
  getBrnachArray(array) {
    let branchArray = [];
    array.forEach((element) => {
      let ispresent = branchArray.filter((x) => x.item.branchId == element.branchId);
      if (ispresent.length == 0) {
        const obj={
          item:element,
          selectdDay:'',
          selectedType:''

        }
        branchArray.push(obj);
      }
      
    });
 
    return branchArray;
  }
  getDayWiseVouchers(dayno){
//weekdays=1;weekend=2

if(dayno==1){
  this.passesList = this.MainList.filter(x=>x.days=='Weekday');
}
if(dayno==2){
 
  this.passesList = this.MainList.filter(x=>x.days=='Weekend');
  
 
}

  }

async addtobasek(index,item){
  let cart = this.cartList.filter(
    (x) => x.DaypasspriceId == item.DaypasspriceId  
  );
  if(cart.length>0){
    this.cartList[index]?.isRadioCheckd==true?this.cartList[index].isRadioCheckd=false:this.cartList[index].isRadioCheckd=true

  }
  
 
}
async addtoCart(){
 //let addtoCart =this.cartList.filter(x=>x.isRadioCheckd==true);

 localStorage.setItem("passesCartItems",JSON.stringify(this.cartList));
 this.toast = await this.toastController.create({
  message: 'Added to basket.Click on checkout to continue',
  position: 'middle',
  duration: 2000
});
this.toast.present();
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
