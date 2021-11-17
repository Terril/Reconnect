import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import {MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { GlobalFooService } from './Services/GlobalServices.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  
})
export class AppComponent {
  public logo:any;
  public appPages = [
    { title: 'My Profile', url: '/tablinks/profile', icon: 'person' },
    { title: 'Day Passes', url: '/pasess', icon: 'card' },
    { title: 'Gym Booking', url: '/gym-booking', icon: 'clipboard' },
    { title: 'Class Booking', url: '/class_booking', icon: 'school' },
    { title: 'My Vouchers', url: '/vouchers', icon: 'id-card' },
    { title: 'My Schedule', url: '/history', icon: 'timer' },
    { title: 'Help', url: '/help', icon: 'help' },
    { title: 'About Us', url: '/about', icon: 'settings' },
  
    //{ title: 'Logout', url: '/login', icon: 'log-out' },
  ];
  userdata: any;
  imgsrc: string;
  
  constructor(private menu: MenuController,private router:Router,private storage:Storage,private globalFooService: GlobalFooService,private cdr: ChangeDetectorRef) {
    
  }
  async ngOnInit(){
    await this.storage.create();
    this.storage.get("userdata").then(data=>{
      if(data!=null){
     this.userdata=data;
     // this.imgsrc=environment.imageUrl+data?.profileImage
     if(localStorage.getItem("profilePic")!=null){
      this.imgsrc=localStorage.getItem("profilePic");
     }else{
     this.imgsrc=null;
    }
     this.userdata.profileImage= this.imgsrc
    }
    
    });
    this.globalFooService.getObservable().subscribe((datas) => {
      this.storage.get("userdata").then(data=>{
        if(data!=null){
       this.userdata=data;
       
       if(localStorage.getItem("profilePic")!=null){
        this.imgsrc=localStorage.getItem("profilePic");
       }else{
       this.imgsrc=environment.imageUrl+data?.ProfilePic
      }
       this.userdata.profileImage= this.imgsrc
      }
      
      });
    
  });
  }

  
   cart()
  {
    this.router.navigate(['/cart'])
  }
  logout(){
    this.storage.clear();
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}
