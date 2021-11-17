import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class HistoryService {

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      private getPurchasedDayPasses = environment.url+"ClassAndGymSchedule/Schedulelist";
      private deleteGymBooking = environment.url+"DeleteGymBookingApi/DeleteGymBooking";
      private deleteClassBokking = environment.url+"DeleteClassBookingApi/DeleteClassBooking";
      private getClassQrCode = environment.url+"ClassBookingQRCodeApi/getQRCode";
      private getGymQrCode = environment.url+"GymBookingQRCode/getQRCode";
      constructor(private httpClient: HttpClient) { 

      }

      _getScheduleList(memberId):Observable<any>{
        return this.httpClient.get(this.getPurchasedDayPasses+"?MemberId="+memberId).pipe(
            catchError(this.handleError)
        )
      }
      _deleteGymBooking(id,email){
        const obj={
          gymBookingId:id,
          email:email
        }
        return this.httpClient.post(this.deleteGymBooking,obj).pipe(
          catchError(this.handleError)
      )
      }
      _deleteClassBooking(id,email){
        const obj={
          classBookingId:id,
          email:email
        }
        return this.httpClient.post(this.deleteClassBokking,obj).pipe(
          catchError(this.handleError)
      )
      }

      _getQrCodeClass(memeberId,bookingID,ClassMasterId){
        return this.httpClient.get(this.getClassQrCode+"?memberId="+memeberId+"&bookingId="+bookingID+"&classMasterId="+ClassMasterId).pipe(
          catchError(this.handleError)
      )

      }
      _getQrCodeGym(memeberId,bookingID,GymMasterId){
        return this.httpClient.get(this.getGymQrCode+"?memberId="+memeberId+"&bookingId="+bookingID+"&gymclassMasterId="+GymMasterId).pipe(
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