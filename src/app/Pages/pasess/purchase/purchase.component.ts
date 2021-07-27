import { PassesService } from './../passes.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController,LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  loading:any;
  passesList:any;
  constructor(private router:Router,private api:PassesService,public loadingController: LoadingController) { }

  async  ngOnInit(){
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    this. get_listing();
  }


  get_listing()
  {
    this.loading.present();
   this.api._getDayPassesList().subscribe(data =>{
    this.passesList =  data.DayPassList;
    this.loading.dismiss();
  })
  }


  _checkOut()
  {
   this.router.navigate(['/checkout']);
  }

}
