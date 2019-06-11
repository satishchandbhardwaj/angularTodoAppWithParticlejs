import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        //'Authorization': tokenPasrse.userToken
       // 'x-auth-token': tokenPasrse.userToken
      })
    };

@Injectable({
  providedIn:'root'
})
export class TodoService {

  loginUrl = "http://localhost:8080/poststudent";
  getusersUrl = 'http://localhost:8080/getstudents';
  delusersUrl = 'http://localhost:8080/deletestudents';
  putuserurl ='http://localhost:8080/students';

  constructor(private http: HttpClient,) { }

  addtodo(userdata):Observable<any>{
    //console.log(userdata);
    return this.http.post<any>(this.loginUrl, userdata, httpOptions)
            .pipe(
              catchError(this.handleError)
            );
  }

  getusers():Observable<any>{
    return this.http.get<any>(this.getusersUrl, httpOptions)
          .pipe(
            catchError(this.handleError)
          );
  }

  deleteusers(id: number):Observable<{}>{
    return this.http.delete<any>(this.delusersUrl+'/'+id, httpOptions)
          .pipe(
            catchError(this.handleError)
          );
  }

  // getedittodo(id){
  //   return this.http.get<any>(this.getusersUrl+'/'+id, httpOptions)
  //   .pipe(
  //     catchError(this.handleError)
  //   );
  // }

  edittodo(userdata, id:number):Observable<{}>{
    return this.http.put<any>(this.putuserurl+'/'+id, userdata, httpOptions)
            .pipe(
              catchError(this.handleError)
            )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  
}
