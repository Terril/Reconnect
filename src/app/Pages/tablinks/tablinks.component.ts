import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController,MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tablinks',
  templateUrl: './tablinks.component.html',
  styleUrls: ['./tablinks.component.css']
})
export class TablinksComponent implements OnInit {
  tab_registry={};
  tabs = [];
  active_tab_name: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public nav: NavController,private menu: MenuController
  ) { }

  ngOnInit(): void {
    this.menu.enable(false);

  }
  navigate = (where) => {
    this.router.navigate([`/tablinks/${where}`])
  }
}
