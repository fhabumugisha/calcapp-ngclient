import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseApiUrl =  environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) { }


  deleteAccount(id: string) {
    return this.http.delete(this.baseApiUrl + '/accounts/'+ id   )
    .pipe(catchError(this.handleError));
  }


  private handleError(errorRes: HttpErrorResponse) {
    const errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.message) {
      return throwError( { message : errorMessage} );
    }

    console.log(errorRes.error);

    return throwError(errorRes.error);
  }

}
