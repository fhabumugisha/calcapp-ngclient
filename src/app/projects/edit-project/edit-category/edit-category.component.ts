import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<EditCategoryComponent>) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: '',
      type: '',
    })
  }
  submit(form) {
    this.dialogRef.close(`${form.value}`);
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
