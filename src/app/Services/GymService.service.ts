import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class GymService {
    private getBranchList = environment.url+"BranchDetailsApi/getBranchList";
    private bookClass = environment.url+"GymBookingApi/GymBooking";
    private getTimeslot = environment.url+"ClassMaster/getGymDetails";
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      constructor(private httpClient: HttpClient) { }

      _getBranches(): Observable<any>
      {
      
       
        return this.httpClient.get<any>(`${this.getBranchList}`).pipe(
          catchError(this.handleError)
        );;
         
      }

      getslots(selectedDay):Observable<any>{
        return this.httpClient.get(this.getTimeslot+"?val="+selectedDay).pipe(
          catchError(this.handleError)
        )
      }
      bookBranch(obj){
        return this.httpClient.post(this.bookClass,obj).pipe(
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