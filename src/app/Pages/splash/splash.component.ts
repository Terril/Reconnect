import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  constructor(private router:Router,private storage:Storage) { }

  async  ngOnInit() {
    await this.storage.create();
    this.storage.get("userdata").then(data=>{
     if(data!=null){
      this.router.navigate(['/tablinks'])
     }
  
    });
  }
  login(){
    this.router.navigate(['/login'])
  }

  dashboard(){
    this.router.navigate(['/register'])
  }
}
