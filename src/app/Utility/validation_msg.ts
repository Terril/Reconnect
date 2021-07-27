import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Injectable({
    providedIn: 'root'
  })
class CustomValidation
{
    constructor(public alertController: AlertController) { }

    async _show_error(msg)
    {
        let alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            message: msg,
            buttons: ['OK']
          });
      
          await alert.present();
    }
}