import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ResetPasswordService } from './resetpassword.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  password_type: string = 'password';
  email_type: string = 'text';
  email:any;
  oldPassword:any;
  newPassword:any;
  loading: HTMLIonLoadingElement;
  toast: HTMLIonToastElement;
  constructor(private router:Router,
    private api:ResetPasswordService,
    public loadingController: LoadingController,
    public toastController: ToastController) { }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    this.toast = await this.toastController.create({
      message: 'Password Reset Successfully',
      position: 'top',
      duration: 2000
    });
  }
 
  togglePasswordMode() {   
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
 }
 next()
 {
  this.resetPassword()
 
 }

 resetPassword(){
   this.loading.present();
   const obj={
    emailId:this.email,
    oldPassword:this.oldPassword,
    newPassword:this.newPassword

   }
   this.api._resetPassword(obj).subscribe(res=>{
    this.loading.dismiss();
    if(res=='Success'){
      this.toast.present();
      this.router.navigate(['/login']);
    }
  
    
   })
 }


}
