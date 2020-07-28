import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
// import { Getall } from '../category/api-calls/GetAllCategories';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  // data: PeriodicElement[];
  
  constructor() { }
  displayedColumns: string[] = ['id', 'name'];
  dataSource = new MatTableDataSource<PeriodicElement>(data);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
const data: PeriodicElement[] = [];
// console.log(data);

export interface PeriodicElement {
  name: string;
  id: number;

}
