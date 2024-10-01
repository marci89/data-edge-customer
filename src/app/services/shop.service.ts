import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { CreateShopRequest, ListShopRequest, Shop, UpdateShopRequest } from '../interfaces/shop.interface';
import { PagedList } from '../interfaces/pagination.interface';
import { BehaviorSubject, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService extends BaseService {

    //Filtered word list subject
    private FilteredListSource = new BehaviorSubject<Shop[] | []>([]);
    filteredList$ = this.FilteredListSource.asObservable();
    
  constructor(private http: HttpClient) {
    super();
  }


  //Read by id
  readById(id: number) {
    return this.http.get<Shop>(this.baseUrl + 'shop/' + id);
  }

  //list with filter
  list(request: ListShopRequest) {
    const params = this.createParams(request);
    return this.http.get<Shop[]>(`${this.baseUrl}shop/list`, { params }).pipe(
      map(result => {
        if (result) {
          this.FilteredListSource.next(result);
        }
      })
    )
  }

   //Create
   create(request: CreateShopRequest) {
    return this.http.post<Shop>(this.baseUrl + 'shop', request).pipe(
      map((created: Shop) => {
        const currentShops = this.FilteredListSource.value || [];
        this.FilteredListSource.next([created, ...currentShops]);
      })
    );
  }

  // Update word and update it in the subject, too
  update(request: UpdateShopRequest) {
    return this.http.put<Shop>(this.baseUrl + 'shop', request).pipe(
      switchMap((updatedResult: Shop) => {
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
