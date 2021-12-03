import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PassesService {

  private getDayPassesList = environment.url+"DayPassesPriceApi/getDayPassPriceList?branchId=";
  private getDayPassesPurchases = environment.url+"PurchaseDayPassesApi/PurchasePasses";
  private getPurchasedDayPasses = environment.url+"MemberDayPassesApi/getDayPassPriceList?memberId=";
  private BOOK_CLASS = environment.url+"ClassBookingApi/classBooking";
  private GET_QR_CODE = environment.url+"DayPassQRCodeApi/getQRCode";
  private GET_REDDEMPTION_DAYPASS_LIST = environment.url+"MemberDayPassRedemptionApi/getDayPassPriceList?memberId="
  private GET_PAYMENT_SUCCESS_FAIL = environment.url+"MemberActivityAPI/MemberTransaction?memberId="
  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private httpClient: HttpClient) { }

  _getDayPassesList(branchId): Observable<any>
  {
  
   
    return this.httpClient.get<any>(`${this.getDayPassesList+branchId}`).pipe(
      catchError(this.handleError)
    );;
     
  }

  _makePayment(data): Observable<any>
  {
  
   
    return this.httpClient.post<any>(this.getDayPassesPurchases,data).pipe(
      catchError(this.handleError)
    );;
     
  }
  _getPurchesedDayPasses(memberId){
    return this.httpClient.get<any>(`${this.getPurchasedDayPasses+memberId}`).pipe(
      catchError(this.handleError)
    );;
     
  }
  _bookClass(data):Observable<any>{
    return this.httpClient.post(this.BOOK_CLASS,data).pipe(
      catchError(this.handleError)
    )
  }
  _getQrCode(daypassId,memberid,memberType,nameOfVoucher){
    return this.httpClient.get<any>(`${this.GET_QR_CODE+"?daypasspriceId="+daypassId+"&memberId="+memberid+"&memberType="+memberType+"&name="+'"'+nameOfVoucher+'"'}`).pipe(
      catchError(this.handleError)
    );
  }
  
_getRedeemPaaesList(memberId,branchId){
  return this.httpClient.get<any>(`${this.GET_REDDEMPTION_DAYPASS_LIST+memberId+"&branchId="+branchId}`).pipe(
    catchError(this.handleError)
  );
}
_getPaymentSuccessFail(memberId,refNo){
  return this.httpClient.get<any>(`${this.GET_PAYMENT_SUCCESS_FAIL+memberId+"&refno="+refNo}`).pipe(
    catchError(this.handleError)
  );
}


  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}