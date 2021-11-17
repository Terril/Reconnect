import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  about="/about"
  
  title="Help"
  constructor( private route: ActivatedRoute,   private router: Router,) { }

  ngOnInit(): void {
    if(this.router.url==this.about){
     this.title="About Us"
    }
    
  }

}
