import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// import { CategoryTableDataSource, CategoryTableItem } from './category-table-datasource';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangeCategoryDialogComponent } from '../../change-category-dialog/change-category-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import axios  from 'axios';
// import { Getall } from '../api-calls/GetAllCategories';
export interface Category {
  id: number;
  name: string;
}
// const data: Category[] = Getall();
@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent implements OnInit {
   
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  categories: Category[];
  constructor(private _dialog: MatDialog, private snackbar: MatSnackBar) {}
  
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<Category>();

  ngOnInit() {    

    var userid = localStorage.getItem('userid');
    var token = localStorage.getItem("token");
    
    axios({
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      method: 'get',
      url: `https://inventory-shop-api.herokuapp.com/category/${userid}`,
    })
      .then((response) => {
        
        this.categories = response.data.message;
        this.dataSource = new MatTableDataSource<Category>(this.categories);
        // console.log(this.dataSource);
        
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;               
        
      })   
      .catch((error) => {
        console.log(error.response.data.message)
        this.snackbar.open(error.response.data.message, '', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        })
        
        
      });
       
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editCategory(categoryName: string, categoryId: number) {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.position = {
      top: '60px'
    }
    dialogConfig.data = {
      categoryName: categoryName,
      categoryId : categoryId,
      type: 'edit',

    }

    let dialogRef = this._dialog.open(ChangeCategoryDialogComponent, dialogConfig);
  }

  deleteCategory(categoryId: string) {
    
    var userid = localStorage.getItem('userid');
    var token = localStorage.getItem("token");
    axios({
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      method: 'delete',
      url: `https://inventory-shop-api.herokuapp.com/category/${userid}/${categoryId}`,
    })   
    .then(response => {
      // this.dataSource.data = response.data.message;
      this.snackbar.open(response.data.message, '', {
        duration: 2000,
        panelClass: ['green-bar'],      
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
      this.ngOnInit();
      // location.reload();
    })
    .catch(error => {
      // console.log(error.response.data.message);  
      this.snackbar.open(error.response.data.message, '', {
        duration: 2000,
        panelClass: ['red-bar'],      
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
        
      })  
    }) 
  }
}
