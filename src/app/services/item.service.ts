import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject, map, of, switchMap } from 'rxjs';
import { CreateItemRequest, Item, ListItemRequest, UpdateItemRequest } from '../interfaces/item.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ItemService extends BaseService {

  private FilteredListSource = new BehaviorSubject<Item[] | []>([]);
  filteredList$ = this.FilteredListSource.asObservable();
  
constructor(private http: HttpClient) {
  super();
}


//Read by id
readById(id: number) {
  return this.http.get<Item>(this.baseUrl + 'item/' + id);
}

//list with filter
list(request: ListItemRequest) {
  const params = this.createParams(request);
  return this.http.get<Item[]>(`${this.baseUrl}item/list`, { params }).pipe(
    map(result => {
      if (result) {
        this.FilteredListSource.next(result);
      }
    })
  )
}

//list for DDL
listForDDL(request: ListItemRequest) {
  const params = this.createParams(request);
  return this.http.get<Item[]>(`${this.baseUrl}item/list`, { params }).pipe(
    map(result => {
      if (result) {
        this.FilteredListSource.next(result);
      }
      return result;
    })
  );
}

 //Create
 create(request: CreateItemRequest) {
  return this.http.post<Item>(this.baseUrl + 'item/create', request).pipe(
    map((created: Item) => {
      const currentShops = this.FilteredListSource.value || [];
      this.FilteredListSource.next([created, ...currentShops]);
    })
  );
}

// Update
update(request: UpdateItemRequest) {
  return this.http.put<Item>(this.baseUrl + 'item/update', request).pipe(
    switchMap((updatedResult: Item) => {
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
