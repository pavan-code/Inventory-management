import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface orders {
   billno: string;
   customername: string;
   mobile: number;
   datetime: string;
   totalproducts: number;
   totalamount : number;
   paymentstatus: string;
}

@Component({
  selector: 'app-manage-orders-table',
  templateUrl: './manage-orders-table.component.html',
  styleUrls: ['./manage-orders-table.component.scss']
})

export class ManageOrdersTableComponent implements OnInit {

  orders : orders[] = [
    { billno: 'BILL1', customername: 'pavan', mobile: 8712077727, datetime: '12-12-2020 8:30AM', totalproducts: 2, totalamount: 200, paymentstatus: 'paid' },
    { billno: 'BILL2', customername: 'surya', mobile: 8712077727, datetime: '12-12-2020 8:30AM', totalproducts: 2, totalamount: 200, paymentstatus: 'paid' },
    { billno: 'BILL3', customername: 'jagan', mobile: 8712077727, datetime: '12-12-2020 8:30AM', totalproducts: 2, totalamount: 200, paymentstatus: 'paid' },
    { billno: 'BILL4', customername: 'venkat', mobile: 8712077727, datetime: '12-12-2020 8:30AM', totalproducts: 2, totalamount: 200, paymentstatus: 'paid' },
    { billno: 'BILL5', customername: 'bobby', mobile: 8712077727, datetime: '12-12-2020 8:30AM', totalproducts: 2, totalamount: 200, paymentstatus: 'paid' },
  ];
  displayedColumns: string[] = ['billno', 'customername', 'mobile', 'datetime', 'totalproducts', 'totalamount', 'paymentstatus']
  constructor() { }
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  dataSource = new MatTableDataSource();
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<orders>(this.orders);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
