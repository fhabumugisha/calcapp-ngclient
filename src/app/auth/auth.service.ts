import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }


  signup(email: string, password: string, confirmPassword: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post('http://localhost:3000/auth/signup',

      { email: email,
        password: password,
        confirmPassword: confirmPassword
      }
    );

  }

  login(email: string, password: string) {
  }

  logout() {}
}
