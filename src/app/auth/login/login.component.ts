import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }
  onSubmit(loginForm: NgForm) {
    if (!loginForm.valid) {
      return;
    }
    const email = loginForm.value.email;
    const password = loginForm.value.password;
    this.isLoading = true;
    this.authService.login(email, password).subscribe(
      resData => {
        this.router.navigate(['/projects']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.isLoading = false;

      }
    );

    loginForm.reset();
  }
}
