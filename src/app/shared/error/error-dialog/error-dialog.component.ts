import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {
  message = "An error occured";
  errorData =  [];
  constructor(@Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.message =  this.data ?  this.data.message : "An error occured" ;
    this.errorData  = this.data ?  this.data.data : [] ;
  }

}
