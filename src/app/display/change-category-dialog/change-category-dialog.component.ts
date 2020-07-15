import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-category-dialog',
  templateUrl: './change-category-dialog.component.html',
  styleUrls: ['./change-category-dialog.component.scss']
})
export class ChangeCategoryDialogComponent implements OnInit {
  changeCategory: FormGroup;
  categoryName : any;

  constructor(private _fb: FormBuilder,
              private dialogRef: MatDialogRef<ChangeCategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private snackbar: MatSnackBar
    ) {  this.categoryName = data }
    formErrors = {
      "categoryName" : ''
    }
    validationMsgs = {
      "categoryName" : {
        "required" : "Category name is required"
      }
    }
  ngOnInit(): void {
    this.createForm();
    this.changeCategory = this._fb.group({
      categoryName : [this.categoryName.categoryName, [Validators.required]]
    })
    this.changeCategory.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  createForm() {
    this.changeCategory = this._fb.group({
      categoryName: ['', [Validators.required]]
    })
    this.changeCategory.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.changeCategory) {
      return;
    }
    const form = this.changeCategory;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previuos error messages if any
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMsgs[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key];
            }
          }
        }
      }
    }
  }
  saveChanges() {
    this.dialogRef.close(this.changeCategory.value);
    if(this.categoryName.type == 'add') {

      this.snackbar.open("Category added successfully", "", {
        duration: 2000,
        panelClass: ["custom-style"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        
      })
    }
    else {
      this.snackbar.open("Category updated successfully", "", {
        duration: 2000,
        panelClass: ["custom-style"],
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
    }
  }

}
