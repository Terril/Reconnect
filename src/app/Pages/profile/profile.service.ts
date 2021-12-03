import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class ProfileService {
    private getTranscationHistory = environment.url+"MemberTransactionApi/MemberTransactionList?memberId=";
    private getActivityHistory = environment.url+"MemberActivityAPI/MemberActivityList?memberId=";
    private getAggriment = environment.url+"membersAggrement/getAggrementDocument?memberId="
    private getOrderDetails=environment.url+"UserPaymentTransactionApi/MemberActivityList?memberId="
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      constructor(private httpClient: HttpClient) { }

      _getTranscationHistory(memberId):Observable<any>{
         return this.httpClient.get(this.getTranscationHistory+memberId);
      }

      _getActivityHistory(memberId):Observable<any>{
        return this.httpClient.get(this.getActivityHistory+memberId);
     }
     _getViewAggriment(memberId){
     
       return this.httpClient.get(this.getAggriment+memberId);
     }
     _getOrderDetails(memberId):Observable<any>{
      return this.httpClient.get(this.getOrderDetails+memberId);
   }
  }