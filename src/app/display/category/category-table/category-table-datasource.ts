// import { DataSource } from '@angular/cdk/collections';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { map } from 'rxjs/operators';
// import { Observable, of as observableOf, merge } from 'rxjs';
// // import { MatSnackBar } from '@angular/material/snack-bar';
// import { Getall } from '../api-calls/GetAllCategories';
// import { OnInit } from '@angular/core';

// // TODO: Replace this with your own data model type
// export interface CategoryTableItem {
//   name: string;
//   id: number;
// }

// // const data = Getall()

// // console.log("hi my budddy")


// export class CategoryTableDataSource extends DataSource<CategoryTableItem>  {
  
//   Data = Getall();
//   // console.log(this.Data);
//   EXAMPLE_DATA: CategoryTableItem[] = this.Data;
//   data: CategoryTableItem[] = this.EXAMPLE_DATA;
//   paginator: MatPaginator;
//   sort: MatSort;

//   constructor() {
//     super();
//   }

//   connect(): Observable<CategoryTableItem[]> {
//     const dataMutations = [
//       observableOf(this.data),
//       this.paginator.page,
//       this.sort.sortChange
//     ];

//     return merge(...dataMutations).pipe(map(() => {
//       return this.getPagedData(this.getSortedData([...this.data]));
//     }));
//   }

//   disconnect() {}

//   private getPagedData(data: CategoryTableItem[]) {
//     const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
//     return data.splice(startIndex, this.paginator.pageSize);
//   }

//   private getSortedData(data: CategoryTableItem[]) {
//     if (!this.sort.active || this.sort.direction === '') {
//       return data;
//     }

//     return data.sort((a, b) => {
//       const isAsc = this.sort.direction === 'asc';
//       switch (this.sort.active) {
//         case 'name': return compare(a.name, b.name, isAsc);
//         case 'id': return compare(+a.id, +b.id, isAsc);
//         default: return 0;
//       }
//     });
//   }


// }

// function compare(a: string | number, b: string | number, isAsc: boolean) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }
