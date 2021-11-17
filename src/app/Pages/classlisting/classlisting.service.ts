import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ClassListingService {
  private GET_CLASS_LIST = environment.url+"ClassMaster/getClassMasterDetails";
  private BOOK_CLASS = environment.url+"ClassBookingApi/classBooking";
  private GET_CALSS_CATEGORY=environment.url+"ClassMasterByCategoryApi/getClassMasterDetail";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  toast: HTMLIonToastElement;
  constructor(private httpClient: HttpClient,public toastController: ToastController,) {
 
   }

  _class_listing(): Observable<any>
  {
  
   
    return this.httpClient.get<any>(`${this.GET_CLASS_LIST}`).pipe(
      catchError(this.handleError)
    );;
     
  }

  bookClass(data):Observable<any>{
    return this.httpClient.post(this.BOOK_CLASS,data).pipe(
      catchError(this.handleError)
    )
  }
  _getClassCategorys():Observable<any>{
    return this.httpClient.get(this.GET_CALSS_CATEGORY).pipe(
      catchError(this.handleError)
    )
  }
  


 async handleError(error) {
   
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
