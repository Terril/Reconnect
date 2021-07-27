import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController, MenuController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage } from '@ionic/storage-angular';
declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data: any;
  icon_name = "caret-down-outline";
  show_container_two:boolean = false;
  show_container_one:boolean = true;
  show_container_three:boolean = false;
  show_container_four:boolean = false;
  icon_name_two = "caret-down-outline";
  icon_name_three = "caret-down-outline";
  icon_name_four = "caret-down-outline";
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
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
  
    alert(imageUrl)
    // Can be set to the src of an image now
    this.img = imageUrl;
  };
  @ViewChild('loadingIcon', { read: ElementRef }) loadingIcon:ElementRef;
  constructor(private menu: MenuController,private animationCtrl: AnimationController,private storage:Storage,) {   }


  async ngOnInit() {
    this.menu.enable(true);
    await this.storage.create();
    this.storage.get("userdata").then(data=>{
      console.log(data);
     
       this.pname = data.Name;
       this.pqr = "data:image/jpeg;base64,"+data.qrCodeString;
       this.pexpdate = data.MembershipEndDate;
       this.pemail = data.MailId;
       this.ptype = data.membershipCategory;
       this.pmemberstart = data.MembershipStartDate;
       this.pmemberend = data.MembershipEndDate;
    });
  }


  public async addNewToGallery() {
    // Take a photo
   
  }
  async opncamera()
  {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    this.img = capturedPhoto.webPath;
  }
 
  ngAfterViewInit() {
    console.log("afterinit");
    setTimeout(() => {
    //  this.startLoad();
    }, 1000);
  }

  toggle4()
  {
  
    if(this.show_container_four==false)
    {
     this.show_container_four = true;
     this.icon_name_four = "caret-down-outline"
    }
    else
    {
      this.show_container_four = false;
      this.icon_name_four = "caret-up-outline"
    }
  }


  toggle3()
  {
  
    if(this.show_container_three==false)
    {
     this.show_container_three = true;
     this.icon_name_three = "caret-down-outline"
    }
    else
    {
      this.show_container_three = false;
      this.icon_name_three = "caret-up-outline"
    }
  }

  toggle2()
  {
  
    if(this.show_container_two==false)
    {
      
     this.show_container_two = true;
     this.icon_name_two = "caret-down-outline"
    }
    else
    {
      this.show_container_two = false;
      this.icon_name_two = "caret-up-outline"
    }
  }
  toggle()
  {
    if(this.show_container_one)
    {
     this.show_container_one = false;
     this.icon_name = "caret-up-outline"
    }
    else
    {
      this.show_container_one = true;
      this.icon_name = "caret-down-outline"
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
    setTimeout(() => {
      this.data = {
        'heading': 'Normal text',
        'para1': 'Lorem ipsum dolor sit amet, consectetur',
        'para2': 'adipiscing elit.'
      };
    }, 5000);
  }
  fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
        this.img = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }
    
    let fileList: FileList = event.target.files;  
    let file: File = fileList[0];
    console.log(file);
  }
}

