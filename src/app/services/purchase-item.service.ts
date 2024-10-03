import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject, map, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreatePurchaseItemRequest, ListPurchaseItemRequest, PurchaseItem, UpdatePurchaseItemRequest } from '../interfaces/purchase-item.interface';

@Injectable({
  providedIn: 'root'
})

export class PurchaseItemService extends BaseService {

  private FilteredListSource = new BehaviorSubject<PurchaseItem[] | []>([]);
  filteredList$ = this.FilteredListSource.asObservable();
  
constructor(private http: HttpClient) {
  super();
}

//Read by id
readById(id: number) {
  return this.http.get<PurchaseItem>(this.baseUrl + 'purchaseItem/' + id);
}

//list with filter
list(request: ListPurchaseItemRequest) {
  const params = this.createParams(request);
  return this.http.get<PurchaseItem[]>(`${this.baseUrl}purchaseItem/list`, { params }).pipe(
    map(result => {
      if (result) {
        this.FilteredListSource.next(result);
      }
    })
  )
}

 //Create
 create(request: CreatePurchaseItemRequest) {
  return this.http.post<PurchaseItem>(this.baseUrl + 'purchaseItem/create', request).pipe(
    map((created: PurchaseItem) => {
      const currentShops = this.FilteredListSource.value || [];
      this.FilteredListSource.next([created, ...currentShops]);
    })
  );
}

// Update
update(request: UpdatePurchaseItemRequest) {
  return this.http.put<PurchaseItem>(this.baseUrl + 'purchaseItem/update', request).pipe(
    switchMap((updatedResult: PurchaseItem) => {
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
