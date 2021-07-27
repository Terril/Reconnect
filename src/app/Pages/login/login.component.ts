import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { MenuController,LoadingController  } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  password_type: string = 'password';
  email_type: string = 'text';
  email_user:any = 'akash.rekalwar92@gmail.com';
  user_pass:any = 'akas234';
  loading:any;
  constructor(private router: Router,private menu: MenuController,private api:LoginService,public alertController: AlertController,private storage:Storage,public loadingController: LoadingController) { }

  async  ngOnInit() {

    await this.storage.create();
    this.storage.get("userdata").then(data=>{
      console.log(data);
    });
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
  }



  togglePasswordMode() {   
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
 }
 ionViewWillEnter() {
  this.menu.enable(false);
 }
 resetpassword()
 {
  this.router.navigate(['/reset-password'])
 }
 terms()
 {
  this.router.navigate(['/policy'])
 }

 async login(){

  /*let post_data = {
    "userName":"akash.rekalwar92@gmail.com",
    "password":"akas234"
};*/

if(this.email_user==null)
{
 
    let alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Please enter email / mobile number',
      buttons: ['OK']
    });

    await alert.present();
 

  
}
else if(this.mailValidation(this.email_user))
{
  let alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    message: 'Please Valid Email',
    buttons: ['OK']
  });

  await alert.present();
}
else if(this.user_pass==null)
{
  let alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    message: 'Please enter password',
    buttons: ['OK']
  });

  await alert.present();
}


else{

  this.loading.present();
      let post_data = {
          "userName":this.email_user,
          "password":this.user_pass
      };
      this.api._auth(post_data).subscribe(async data =>{
      
        if(data=="Invalid")
        {
          this.loading.dismiss();
         let  alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            message: 'Invalid Credentials',
            buttons: ['OK']
          });
          await alert.present();
        }
        else
        {
          this.loading.dismiss();
         this.storage.set("userdata",data);
         this.router.navigate(['/tablinks'])
        }
      })
  }

}

 mailValidation(val) {
  var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  if (!expr.test(val)) {
      return true;
  }
  
}

}
