import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  homepage()
  {

    this.route.navigate(['/tablinks']);
  }

}
