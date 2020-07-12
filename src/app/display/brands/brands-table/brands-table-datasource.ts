import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Input, OnInit } from '@angular/core';
// import { GetBrandsService } from '../../../services/get-brands.service';

// TODO: Replace this with your own data model type
export interface BrandsTableItem {
  name: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: BrandsTableItem[] = [
  {id: 1, name: 'Cintool'},
  {id: 2, name: 'Santoor'},
  {id: 3, name: 'Medimix'},
  {id: 4, name: 'Lux'},
  {id: 5, name: 'Lifebuoy'},

];

export class BrandsTableDataSource extends DataSource<BrandsTableItem> {
  data: BrandsTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;
  // brands: import("j:/Inventory-management/src/app/services/get-brands.service").brand[];
  
  constructor() {
    super();
  }
 
  // ngOnInit() {
  //   this.brandService.getBrands()
  //   .subscribe(brands => {
  //     this.brands = brands;
  //   })
  // }

  connect(): Observable<BrandsTableItem[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }
  disconnect() {}

  private getPagedData(data: BrandsTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: BrandsTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
