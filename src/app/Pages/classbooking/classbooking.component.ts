import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classbooking',
  templateUrl: './classbooking.component.html',
  styleUrls: ['./classbooking.component.scss'],
})
export class ClassbookingComponent implements OnInit {
  list: any[] = new Array('Yoga','Prama','Meditation','Arobics');
  condition: number = 2;
  constructor(private router:Router) { }

  ngOnInit() {}
  detail_page():void
  {
    this.router.navigate(['/details/1'])
  }
}
