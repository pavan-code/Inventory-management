import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import axios from 'axios';
@Component({
  selector: 'app-change-category-dialog',
  templateUrl: './change-category-dialog.component.html',
  styleUrls: ['./change-category-dialog.component.scss']
})
export class ChangeCategoryDialogComponent implements OnInit {
  changeCategory: FormGroup;
  category : any;
  hide: boolean = false;
  constructor(private _fb: FormBuilder,
              private dialogRef: MatDialogRef<ChangeCategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private snackbar: MatSnackBar
    ) {  this.category = data }
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
      categoryName : [this.category.categoryName, [Validators.required]]
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

    var userid = localStorage.getItem("userid")
    var token = localStorage.getItem("token")
    
    if(this.category.type == 'add') {
      
      this.hide = true;
      axios({
        headers: {
          'Content-type' : 'application/json; charset=UTF-8',
          Authorization : `Bearer ${token}`
        },
        method: 'post',
        url : `https://inventory-shop-api.herokuapp.com/category/${userid}`,
        data : {
          name : this.changeCategory.value.categoryName
        }
      }).then(response => {
        this.hide = false;
        this.dialogRef.close();
        this.snackbar.open(response.data.message, "", {
          duration: 5000,
          panelClass: ["custom-style"],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',          
        })
        // location.assign("/home/category")
        location.assign("https://pavan-code.github.io/Inventory-management/home/category");
       
      })
      .catch(error => {
        this.hide = false;
        this.dialogRef.close();
        this.snackbar.open(error.response.data.message, "", {
          duration: 5000,
          panelClass: ["custom-style"],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          
        })
      })
    }
    else {
      this.hide = true;
      var id = this.category.categoryId;
      this.dialogRef.close();
      axios({
        headers: {
          'Content-type' : 'application/json; charset=UTF-8',
          Authorization : `Bearer ${token}`
        },
        method: 'put',
        url : `https://inventory-shop-api.herokuapp.com/category/${userid}/${id}`,
        data : {
          name : this.changeCategory.value.categoryName
        }
      }).then(response => {
        this.hide = false;
        this.dialogRef.close();
        this.snackbar.open(response.data.message, "", {
          duration: 5000,
          panelClass: ["custom-style"],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',          
        })
        // location.assign("/home/category")
        location.assign("https://pavan-code.github.io/Inventory-management/home/category");
       
      })
      .catch(error => {
        this.hide = false;
        this.dialogRef.close();
        this.snackbar.open(error.response.data.message, "", {
          duration: 5000,
          panelClass: ["custom-style"],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          
        })
      })
    
    }
  }

}
