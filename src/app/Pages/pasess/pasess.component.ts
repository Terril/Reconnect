import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pasess',
  templateUrl: './pasess.component.html',
  styleUrls: ['./pasess.component.css']
})
export class PasessComponent implements OnInit {
  show_container_one:boolean = true;
  icon_name = "caret-down-outline";
  show_container_two:boolean = false;
  icon_name_two = "caret-down-outline";
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  toggle2()
  {
  
    if(this.show_container_two==false)
    {
     this.show_container_two = true;
     this.icon_name_two = "caret-down-outline"
    }
    else
    {
      this.show_container_two = false;
      this.icon_name_two = "caret-up-outline"
    }
  }
  toggle()
  {
    if(this.show_container_one)
    {
     this.show_container_one = false;
     this.icon_name = "caret-up-outline"
    }
    else
    {
      this.show_container_one = true;
      this.icon_name = "caret-down-outline"
    }
  }

  pucrchase()
  {
    this.router.navigate(['/pasess/purchae'])
  }

}
