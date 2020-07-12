import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class brand {
  id: string;
  name: string;
}

export class GetBrandsService {

  constructor(private http: HttpClient) { }

  getBrands():Observable<brand[]> {
    return this.http.get<brand[]>("http://localhost:3000/" + 'brands');
  }

}
