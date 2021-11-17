import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { MenuController,LoadingController  } from '@ionic/angular';
import { RegisterService } from './register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  password_type: string = 'password';
  email_type: string = 'text';
  user_email:any;
  user_name:any;
  user_password:any;
  loading:any;
  constructor(private router:Router,public alertController: AlertController,private storage:Storage,public loadingController: LoadingController,private api:RegisterService) { }

  async ngOnInit() {
    await this.storage.create();
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
  }
 
  togglePasswordMode() {   
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
 }
 async register()
 {
  if(this.user_email==null)
{
 
    let alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Please enter email / mobile number',
      buttons: ['OK']
    });

    await alert.present();
 

  
}
else if(this.user_name==null)
{
  let alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    message: 'Please Enter Name',
    buttons: ['OK']
  });

  await alert.present();
}
else if(this.mailValidation(this.user_email))
{
  let alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    message: 'Please Valid Email',
    buttons: ['OK']
  });

  await alert.present();
}
else if(this.user_password==null)
{
  let alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    message: 'Please enter password',
    buttons: ['OK']
  });

  await alert.present();
}
 else
 {
   let param = {"name":this.user_name,"email":this.user_email,"password":this.user_password};
    this.api._register(param).subscribe( async data=>{
      if(data=="Invalid")
      {
        this.loading.dismiss();
       let  alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          message: 'Invalid Credentials/email id already present.',
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


