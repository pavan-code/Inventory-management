import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

// export interface brandsArray {
//   index: number,
//   name: string
// }

// const brands: brandsArray[] = [
//   { index: 1, name: "santoor"},
//   { index: 2, name: "lux"},
//   { index: 3, name: "lifebuoy"},
//   { index: 4, name: "cintool"},
//   { index: 5, name: "liril"},
//   { index: 6, name: "medimix"}
// ]

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new ExampleDataSource();
  
  
}
export class ExampleDataSource extends DataSource<PeriodicElement> {
  data = new BehaviorSubject<PeriodicElement[]>(ELEMENT_DATA);
  connect(): Observable<PeriodicElement[]> {
    return this.data;
  }

  disconnect() {}
}
