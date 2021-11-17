import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VouchersService {

  private getVoucherList = environment.url+"VoucherByBranchApi/getVoucherList";
  private getSubVoucherList = environment.url+"VoucherDetailListApi/getVoucherList";
  private getQrCodeimage = environment.url+"VoucherQRCodeApi/getQRCode?actualVoucherId=";
  private getgroupredeemvouchers = environment.url+"GroupClassVoucherApi/getVoucherList";
  private bookclassusingvoucher=environment.url+"ClassBookingUsingVoucherApi/classBooking";


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private httpClient: HttpClient) { }

  _getVoucherList(branchs:any,memberId:any): Observable<any>
  {
  const obj={
    branch:branchs,
    memberId:memberId
  }
   
    return this.httpClient.post<any>(`${this.getVoucherList}`,obj).pipe(
      catchError(this.handleError)
    );;
     
  }

  _getSubVoucherList(branchId:any,voucherId:any): Observable<any>
  {
  const obj={
    voucherId:voucherId,
    branchId:branchId

  }
   
    return this.httpClient.post<any>(`${this.getSubVoucherList}`,obj).pipe(
      catchError(this.handleError)
    );;
     
  }

  _getQrCodeString(voucherId:any,memberId:any,memberType:any,nameOfVoucher): Observable<any>
  {
 
    return this.httpClient.get<any>(this.getQrCodeimage+voucherId+"&memberId="+memberId+"&memberType="+memberType+"&name="+'"'+nameOfVoucher+'"').pipe(
      catchError(this.handleError)
    );;
     
  }

  _getReddemVouchers(){
    return this.httpClient.get<any>(this.getgroupredeemvouchers).pipe(
      catchError(this.handleError)
    );
  }
  _bookClass(data):Observable<any>{
    return this.httpClient.post(this.bookclassusingvoucher,data).pipe(
      catchError(this.handleError)
    )
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