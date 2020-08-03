import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
// import axios from 'axios';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddProductDialogComponent } from 'src/app/add-product-dialog/add-product-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar'
export interface products {
  id: number;
  name: string;
  quantity: number;
  rate: number;
  amount: number;
}

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private matDialog: MatDialog, private snackbar : MatSnackBar) { }
  products: products[] = [
    { id:1, name:'pen', quantity: 344, rate: 3, amount: 0},
    { id:2, name:'pencil', quantity: 472, rate: 5, amount: 0},
    { id:3, name:'eraser', quantity: 354, rate: 2, amount: 0},
    { id:4, name:'book', quantity: 324, rate: 30, amount: 0},
    { id:5, name:'paper', quantity: 834, rate: 1, amount: 0},

  ];
  Products: products[] = []

  displayedColumns: string[] = ['name', 'quantity', 'rate', 'amount', 'actions'];
  dataSource = new MatTableDataSource<products>();
  names: string[] = [];
  ngOnInit(): void {
    this.names = [];
    this.products.filter(pro => this.names.push(pro.name))
    this.dataSource = new MatTableDataSource<products>(this.Products);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addProduct() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.position = {
      top: '60px'
    }
    dialogConfig.data = {
      name: this.names
    }
    const dialogRef = this.matDialog.open(AddProductDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {      
      let obj = this.products.filter(pro => pro.name === data.name)[0]  
      data.rate = obj.rate;             
      data.amount = obj.rate*data.quantity;
      this.Products.push(data)
      // console.log(this.Products);
      this.ngOnInit();
      
    })
  }

  editProduct(name: string, id: number, quantity: number) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.position = {
      top: '60px'
    }
    dialogConfig.data = {
      name : this.names,
      product : name,
      quantity : quantity,
      type : 'edit'
    }
    let dialogRef = this.matDialog.open(AddProductDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(data => {

      console.log("product updated");
      let obj = this.products.filter(pro => pro.name === data.name)[0]
      data.rate = obj.rate;
      data.amount = data.rate * data.quantity
      let id = this.Products.findIndex(pro => pro.name == data.name)
      this.Products.splice(id, 1);
      this.Products.push(data);
      this.ngOnInit();
      
    })
  }

  deleteProduct(id: number) {
    console.log("deleted product from order");
    let index = this.Products.findIndex(prod => prod.id == id)[0]
    this.Products.splice(index,1)
    this.ngOnInit();    
  }

}
