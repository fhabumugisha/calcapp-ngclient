import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<EditCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
      title: [this.data ?  this.data.title : '', Validators.required],
      type: [this.data ? this.data.type : '', Validators.required],

    });
  }
  submit(form) {
    this.dialogRef.close(this.form.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  categoryTypes = [
    {
      code: "other",
      label: "Other"
    },
    {
      code: "income",
      label: "Income"
    },
    {
      code: "expenses",
      label: "Expenses"
    }
  ];
}
