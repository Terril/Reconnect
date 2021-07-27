import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  password_type: string = 'password';
  email_type: string = 'text';
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
 
  togglePasswordMode() {   
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
 }
 next()
 {
  this.router.navigate(['/tablinks']);
 }

}
