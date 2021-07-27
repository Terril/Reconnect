import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  list: any[] = new Array(5);
  condition: number = 2;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  detail_page():void
  {
    this.router.navigate(['/details/1'])
  }
}
