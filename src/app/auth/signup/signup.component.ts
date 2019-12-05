import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from 'src/app/shared/error/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;
  constructor(private authService: AuthService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {
  }


  onSubmit(signupForm : NgForm){
    if (!signupForm.valid) {
      return;
    }
    this.isLoading = true;
    const email =  signupForm.value.email;
    const password = signupForm.value.password;
    const confirmPassword = signupForm.value.confirmPassword;
    this.authService.signup(email, password, confirmPassword).subscribe(
      (data) => {
        console.log('success');

        this.router.navigate(['/auth/login']);
      },
      (errorData) => {
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

  }
}
