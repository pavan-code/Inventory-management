import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ProductsTableItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  description: string;
  category: string;
  brand: string;
  
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ProductsTableItem[] = [
  {id: 1, name: 'soap', price: '34', quantity: 43, description: 'adfadfadsfadsf', category: 'category', brand: 'brand' },
  {id: 2, name: 'biscuit', price: '27', quantity: 26, description: 'adfadfadsfadsf', category: 'category', brand: 'brand' },
  {id: 3, name: 'cereal', price: '78', quantity: 83, description: 'adfadfadsfadsf', category: 'category', brand: 'brand' },
];

export class ProductsTableDataSource extends DataSource<ProductsTableItem> {
  data: ProductsTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

 
  connect(): Observable<ProductsTableItem[]> {
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

  private getPagedData(data: ProductsTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: ProductsTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'price': return compare(+a.price, +b.price, isAsc);
        case 'quantity': return compare(a.quantity, b.quantity, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
