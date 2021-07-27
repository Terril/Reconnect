import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MenuController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public logo:any;
  public appPages = [
    { title: 'My Profile', url: '/tablinks/profile', icon: 'person' },
    { title: 'Digital Wallet', url: '/digital-wallet', icon: 'card' },
    { title: 'Booking History', url: '/history', icon: 'clipboard' },
    { title: 'Vouchers / Coupons', url: '/vouchers', icon: 'gift' },
    { title: 'Wishlist', url: '/tablinks/wishlist', icon: 'heart' },
    { title: 'Help', url: '/folder/Spam', icon: 'help' },
    { title: 'About Us', url: '/folder/Spam', icon: 'settings' },
    { title: 'Rate us', url: '/folder/Spam', icon: 'star' },
    { title: 'Logout', url: '/folder/Spam', icon: 'log-out' },
  ];
  constructor(private menu: MenuController,private router:Router) {}
  ngOnInit(): void {}


   cart()
  {
    this.router.navigate(['/cart'])
  }

}
