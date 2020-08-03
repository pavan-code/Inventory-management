import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangeProductDialogComponent } from '../../change-product-dialog/change-product-dialog.component';
import axios from 'axios'
export interface Product {
  id: number;
  name: string;
  price: number;
  quantitity: number;    
}
@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  products: Product[];
  constructor(private snackbar: MatSnackBar, private _dialog: MatDialog) {}
  
  displayedColumns = ['id', 'name', 'price', 'quantity', 'actions'];
  dataSource = new MatTableDataSource<Product>();

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
        
        this.products = response.data.message;
        this.dataSource = new MatTableDataSource<Product>(this.products);
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

  editProduct(product: any) {
    // console.log(product);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data : product
    }
    dialogConfig.disableClose = true;
    dialogConfig.position = {
      top: '60px'
    }
    let dialogRef = this._dialog.open(ChangeProductDialogComponent, dialogConfig);

  }
  
  deleteProduct(productId: number) {
    // console.log(productId);
    this.snackbar.open("Product deleted successfully", '', {
      duration: 2000,
      horizontalPosition:"center",
      verticalPosition: "bottom",
      panelClass: ['custom-style']
      
    })

  }
}
