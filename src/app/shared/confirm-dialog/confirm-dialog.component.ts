import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  elementToDelete: string;
  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,@Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.elementToDelete =  this.data ?  this.data.elementToDelete : "" ;
  }

  onConfirm(yesOrNo: boolean){
    this.dialogRef.close(yesOrNo);
  }
}
