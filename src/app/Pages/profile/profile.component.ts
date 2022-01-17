import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AnimationController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage } from '@ionic/storage-angular';
import { ProfileService } from './profile.service';
import { environment } from 'src/environments/environment';
import { GlobalFooService } from 'src/app/Services/GlobalServices.service';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnChanges {
  data: any;
  icon_name = "chevron-down-outline";
  show_container_two:boolean = false;
  show_container_one:boolean = true;
  show_container_three:boolean = false;
  show_container_four:boolean = false;
  show_container_five: boolean=false;
  icon_name_two = "chevron-down-outline";
  icon_name_three = "chevron-down-outline";
  icon_name_four = "chevron-down-outline";
  icon_name_five ="chevron-down-outline";
  img:any="../../../assets/no_profile.jpg";
  pname:any;
  pemail:any;
  pcontact:any;
  paddress:any;
  pqr:any;
  ptype:any;
  pmemberstart:any;
  pmemberend:any;
  pexpdate:any;
   takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 40,
      allowEditing: true,
      width:100,
      height:100,
      resultType: CameraResultType.Base64
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.base64String;
  
    this.img = imageUrl;
    
    this.img='data:image/jpeg;base64,'+imageUrl;
    
    localStorage.setItem("profilePic",this.img);
    console.log(this.img)
    this.globalFooService.publishSomeData({
      foo: 'bar'
  });
  };
  @ViewChild('loadingIcon', { read: ElementRef }) loadingIcon:ElementRef;
  lname: string;
  contact: any;
  userdata: any;
  loading: HTMLIonLoadingElement;
  transctionList: any=[];
  activityList: any=[];
  TermsAndConditions: string;
  viewaggrimenturl: Object;
  url: string;
  toast2: HTMLIonToastElement;
  dob:any;
  doc:any;
  unitno:any;
   MemberId=0;
  AllactivityList: any;
  loadMore=true;
  loadMoretrans: boolean=true;
  AllTransctionList: any;
  AllOrderDeatils:any;
  loadMoreorder=true;
  orderDeatilsList=[];
  show_container_six: boolean=false;
  icon_name_six= "chevron-down-outline";
  classcartOrder: any;
 
  constructor(private menu: MenuController,
    private animationCtrl: AnimationController,
    public loadingController: LoadingController,
    private globalFooService: GlobalFooService,
    public toastController: ToastController,
    private router:Router,
    private storage:Storage,private api:ProfileService) {   }
  
    ngOnChanges(changes: SimpleChanges): void {
   console.log("asasas")
  }


  async ngOnInit() {
    let cartorderString = localStorage.getItem('classcartDetails');
    this.classcartOrder = JSON.parse(cartorderString);
    this.loadMore=true;
    this.loadMoretrans=true;
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    this.toast2 = await this.toastController.create({
      message: 'OOPS!! Agreement not available',
      position: 'top',
      duration: 2000
    });
    this.menu.enable(true);
    await this.storage.create();
    this.storage.get("userdata").then(data=>{
    
        this.userdata=data;
        this._getAggriment();
        console.log(this.userdata);
       let fullname:string=data?.Name;
       this.pname = fullname.split(' ')[0];
       this.lname = fullname.split(' ')[1];
       if(localStorage.getItem("profilePic")!=null){
        this.img=localStorage.getItem("profilePic");
       }else{
       this.img=undefined;
      }
       this.pqr = "data:image/jpeg;base64,"+data.qrCodeString;
       this.pexpdate = data.MembershipEndDate;
       this.TermsAndConditions = data.TermsAndConditions?.replace("-","\n");
    
       this.pemail = data.MailId;
       this.contact=data?.Contact==null||data?.Contact==''?'N/A':data?.Contact;
       this.ptype = data.membershipCategory==''?'N/A':data.membershipCategory;
       this.pmemberstart = data?.MembershipStartDate?.split("T")[0];
       this.pmemberend = data?.MembershipEndDate?.split("T")[0];
     
      
       if(this.userdata.role==null|| this.userdata.role==""|| this.userdata.role=="guest"){
        this.pexpdate="2021-09-13"
        this.MemberId=this.userdata.MemberLogId;
      }else{
   
        this.MemberId=this.userdata.actualMemberId; 
     }
     this.getTransctionHistory();
     this.getActivityHistory();
     this._getOrderDetails();
       
    });

 
  
  }


  public async addNewToGallery() {
    // Take a photo
   
  }
  async opncamera()
  {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100
    });

    this.img='data:image/jpeg;base64,'+capturedPhoto.base64String;
    
    localStorage.setItem("profilePic",this.img);
    
      this.globalFooService.publishSomeData({
        foo: 'bar'
    });    
    
  
  }
 
  ngAfterViewInit() {

    setTimeout(() => {
 //  this.startLoad();
    }, 1000);
  }

  toggle4()
  {
  
    if(this.show_container_four==false)
    {
     this.show_container_four = true;
     this.icon_name_four = "chevron-down-outline"
    }
    else
    {
      this.show_container_four = false;
      this.icon_name_four = "chevron-up-outline"
    }
  }
  toggle5()
  {
  
    if(this.show_container_five==false)
    {
     this.show_container_five = true;
     this.icon_name_five = "chevron-down-outline"
    }
    else
    {
      this.show_container_five = false;
      this.icon_name_five = "chevron-up-outline"
    }
  }

  toggle6()
  {
  
    if(this.show_container_six==false)
    {
     this.show_container_six = true;
     this.icon_name_six = "chevron-down-outline"
    }
    else
    {
      this.show_container_six = false;
      this.icon_name_six = "chevron-up-outline"
    }
  }
  toggle3()
  {
  
    if(this.show_container_three==false)
    {
     this.show_container_three = true;
     this.icon_name_three = "chevron-down-outline"
    }
    else
    {
      this.show_container_three = false;
      this.icon_name_three = "chevron-up-outline"
    }
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

  front_side()
  {
    $(".v_card").show()
    $(".front_side").hide()
  }
  back_side()
  {
  
    $(".v_card").hide()
   // $(".front_side").toggleClass('flipped')
    $(".front_side").show()
   
  }
  startLoad() {
    const loadingAnimation = this.animationCtrl.create('loading-animation')
      .addElement(this.loadingIcon.nativeElement)
      .duration(1500)
      .iterations(3)
      .fromTo('transform', 'rotate(0deg)', 'rotate(360deg)');

    // Don't forget to start the animation!
    loadingAnimation.play();
  }
  ionViewWillEnter() {
     
      this.ngOnInit();  
     }
  
  fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
        this.img = event.target.result;
        localStorage.setItem("profilePic",this.img);
    
      this.globalFooService.publishSomeData({
        foo: 'bar'
    });    
    
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }
    
    let fileList: FileList = event.target.files;  
    let file: File = fileList[0];
  }

  getTransctionHistory(){
    this.loading.present();
    this.api._getTranscationHistory(this.MemberId).subscribe(res=>{
    this.transctionList=[];
      
      this.AllTransctionList=res?.Transaction;
      if(res?.Transaction.length>=5){
        for(let i=0;i<5;i++){
          this.transctionList?.push(res?.Transaction[i]);
        
        }
      }else{
        this.loadMoretrans=false;
      this.transctionList=res?.Transaction;
    }
      this.loading.dismiss();
    })
  }
  getActivityHistory(){
    this.activityList=[];
    this.loading.present();
    this.api._getActivityHistory(this.MemberId).subscribe(res=>{
      this.AllactivityList=res?.Activity;
      this.activityList=[];
      if(res?.Activity.length>=5){
        this.loadMore=true;
        for(let i=0;i<5;i++){
          this.activityList?.push(res?.Activity[i]);
        
        }
       
      }else{
        this.loadMore=false;
      this.activityList=res?.Activity;
    }
    
      this.loading.dismiss();
    })
  }

  _getOrderDetails(){
    this.orderDeatilsList=[];
    this.loading.present(); 
    this.api._getOrderDetails(this.MemberId).subscribe(res=>{
      this.AllOrderDeatils=res;
      this.orderDeatilsList=[];
      if(res.length>=5){
        this.loadMoreorder=true;
        for(let i=0;i<5;i++){
          this.orderDeatilsList?.push(res[i]);
        
        }
       
      }else{
        this.loadMoreorder=false;
      this.orderDeatilsList=res;
    }
    
      this.loading.dismiss();
    })
  }

  _getAggriment(){
    this.loading.present();
    let memberId=this.userdata.role=="Member"?this.userdata.actualMemberId:this.userdata.MemberLogId
    this.api._getViewAggriment(memberId).subscribe(res=>{
      this.viewaggrimenturl=res;
      this.url = environment.imageUrl+this.viewaggrimenturl;
      console.log(this.url);
     
      
    })
  }
  _viewaggriment(){
    if(this.viewaggrimenturl!=null && this.viewaggrimenturl!=""){
      document.getElementById('aggriment').click();
    }else{
      this.toast2.present();
    }
    
  }
  getcolor(){
    let membership:string = this.userdata?.membershipCategory;
    if(membership?.trim().toLocaleLowerCase()=='gold'){
      return '#cab67bc2'
    }
    if(membership?.trim().toLocaleLowerCase()=='silver'){
      return '#beb8b48f'
    }
    if(membership?.trim().toLocaleLowerCase()=='platinum'){
      return '#7c797675'
    }
    if(membership?.trim().toLocaleLowerCase()=='diamond'){
      return '#22242821'
    }
    if(membership?.trim().toLocaleLowerCase()=='blue'){
      return '#0c2b6a4d'
    }
  }
 loadmore(){
   this.loadMore=false;
   this.activityList=[];
   this.activityList=this.AllactivityList;

 }
 loadmoretrans(){
  this.loadMoretrans=false;
  this.transctionList=[];
  this.transctionList=this.AllTransctionList;
 }
 loadmoreorderdetails(){
  this.loadMoreorder=false;
  this.orderDeatilsList=[];
  this.orderDeatilsList=this.AllOrderDeatils;
 }
 cart()
{
this.router.navigate(['/cart'])
}
}

