import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class ResetPasswordService {
    private resetPassword = environment.url+"ResetPasswordApi/ResetPassword";
    
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      constructor(private httpClient: HttpClient) { }

      _resetPassword(data):Observable<any>{
         return this.httpClient.post(this.resetPassword,data);
      }

     
  }