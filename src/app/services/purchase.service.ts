
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject, map, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreatePurchaseRequest, ListPurchaseRequest, Purchase, UpdatePurchaseRequest } from '../interfaces/purchase.interface';

@Injectable({
  providedIn: 'root'
})

export class PurchaseService extends BaseService {

  private FilteredListSource = new BehaviorSubject<Purchase[] | []>([]);
  filteredList$ = this.FilteredListSource.asObservable();
  
constructor(private http: HttpClient) {
  super();
}


//Read by id
readById(id: number) {
  return this.http.get<Purchase>(this.baseUrl + 'purchase/' + id);
}

//list with filter
list(request: ListPurchaseRequest) {
  const params = this.createParams(request);
  return this.http.get<Purchase[]>(`${this.baseUrl}purchase/list`, { params }).pipe(
    map(result => {
      if (result) {
        this.FilteredListSource.next(result);
      }
    })
  )
}

 //Create
 create(request: CreatePurchaseRequest) {
  return this.http.post<Purchase>(this.baseUrl + 'purchase/create', request).pipe(
    map((created: Purchase) => {
      const currentShops = this.FilteredListSource.value || [];
      this.FilteredListSource.next([created, ...currentShops]);
    })
  );
}

// Update
update(request: UpdatePurchaseRequest) {
  return this.http.put<Purchase>(this.baseUrl + 'purchase/update', request).pipe(
    switchMap((updatedResult: Purchase) => {
      const currentRecords = this.FilteredListSource.value || [];
      const updatedRecords = currentRecords.map(result => {
        if (result.id === updatedResult.id) {
          return updatedResult;
        }
        return result;
      });
      this.FilteredListSource.next(updatedRecords);
      return of(updatedRecords);
    })
  );
}
}
