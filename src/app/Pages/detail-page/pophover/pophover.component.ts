import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pophover',
  templateUrl: './pophover.component.html',
  styleUrls: ['./pophover.component.css']
})
export class PophoverComponent implements OnInit {
  public appPages = [
    { title: 'My Profile', url: '/tablinks/profile', icon: 'person' },
    { title: 'Digital card', url: '/folder/Favorites', icon: 'card' },
    { title: 'Avtivity', url: '/folder/Favorites', icon: 'clipboard' },
    { title: 'Vouchers', url: '/folder/Archived', icon: 'gift' },

    { title: 'Help', url: '/folder/Spam', icon: 'help' },
    { title: 'setting', url: '/folder/Spam', icon: 'settings' },

    { title: 'Logout', url: '/folder/Spam', icon: 'log-out' },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
