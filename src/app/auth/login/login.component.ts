import { ErrorDialogComponent } from './../../shared/error/error-dialog/error-dialog.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog) { }

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
      errorData => {
        console.log(errorData.message);

        this.isLoading = false;
        this.dialog.open(ErrorDialogComponent, {
          hasBackdrop: true,
          data : {
            message : errorData.message,
            data : errorData.data
          }
        });

      }
    );

    loginForm.reset();
  }
}
