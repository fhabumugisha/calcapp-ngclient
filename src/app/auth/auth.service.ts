import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';


export interface AuthResponseData {

  token: string;
  email: string;
  expiresIn: string;
  userId: string;

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  private tokenExpirationTimer: any;

  user = new BehaviorSubject<User>(null);

  baseApiUrl =  environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }


  signup(email: string, password: string, confirmPassword: string) {

    const body = {
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }
    return this.http.post(this.baseApiUrl + '/auth/signup', body, this.httpOptions   )
    .pipe(catchError(this.handleError));

  }

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    };
    return this.http.post<AuthResponseData>(this.baseApiUrl + '/auth/login', body, this.httpOptions)
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(
            resData.email,
            resData.userId,
            resData.token,
            +resData.expiresIn
        );
      })
    );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['auth/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }


  private handleError(errorRes: HttpErrorResponse) {
    const errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.message) {
      return throwError( { message : errorMessage} );
    }

    console.log(errorRes.error);

    return throwError(errorRes.error);
  }


  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {

    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);

    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }


  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

}

