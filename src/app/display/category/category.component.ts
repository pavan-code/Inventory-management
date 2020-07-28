import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import {  MatSnackBar } from '@angular/material/snack-bar';

import { ChangeCategoryDialogComponent } from '../change-category-dialog/change-category-dialog.component';
import axios from 'axios'
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  result: any;
  loginForm: any;
  

  constructor(private _dialog: MatDialog, private snackbar: MatSnackBar) { }

  addCategory() {
    var userid = localStorage.getItem('userid');
    var token = localStorage.getItem("token");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.position = {
      top: '60px'
    }
    dialogConfig.data = {
      type: 'add'
    }
    if(userid != null && token != null) 
    {
      let dialogRef = this._dialog.open(ChangeCategoryDialogComponent, dialogConfig)
    }
  }
}