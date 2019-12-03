import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<EditItemComponent>) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]],
    });
  }
  submit(form) {
    this.dialogRef.close(this.form.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
