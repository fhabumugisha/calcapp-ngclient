import { ConfirmDialogComponent } from './../../shared/confirm-dialog/confirm-dialog.component';
import { User } from './../../auth/user.model';
import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { ErrorDialogComponent } from 'src/app/shared/error/error-dialog/error-dialog.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  user: User;
  isLoading = false;
  confirmDeleteDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router,
    private dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
     this.authService.user.subscribe( user => {
      this.user = user;
    });
  }


  onDelete() {

    this.confirmDeleteDialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: false,
      data : {
        elementToDelete: 'your account',

      }
    });

    this.confirmDeleteDialogRef
    .afterClosed()
    .subscribe((responseData: boolean) => {
      console.log(responseData);


      if (responseData ) {
          this.isLoading = true;
          this.accountService.deleteAccount(this.user.id).subscribe(
            (result :{message:string}) => {
              this.authService.logout();
              this.openSnackBar(result.message, 'Ok');
              this.router.navigate(['/']);
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
        }



    });





  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 2000,
    });
 }
}
