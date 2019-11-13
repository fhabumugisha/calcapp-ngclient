import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }


  onSubmit(signupForm : NgForm){
    if (!signupForm.valid) {
      return;
    }

    const email =  signupForm.value.email;
    const password = signupForm.value.password;
    const confirmPassword = signupForm.value.confirmPassword;
    this.authService.signup(email, password, confirmPassword).subscribe(
      (data) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );

  }
}
