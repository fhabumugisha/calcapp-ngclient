import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<EditItemComponent>,
              @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    console.log(this.data._id );
    this.form = this.formBuilder.group({
      _id: [this.data ? this.data._id : ''],
      title: [this.data ? this.data.title : '', Validators.required],
      amount: [this.data ? this.data.amount : '', [Validators.required, Validators.pattern(/^\d+\.?\d{0,2}$/)]],
    });
  }
  submit(form) {
    this.dialogRef.close(this.form.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
