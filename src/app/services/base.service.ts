import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected baseUrl = environment.apiUrl;

  constructor() { }

  // Helper function to build HttpParams
  protected createParams(filter: any): HttpParams {

    let params = new HttpParams();
    for (const key in filter) {
      if (filter[key] !== null && filter[key] !== undefined) {
        params = params.set(key, filter[key].toString());
      }
    }
    return params;
  }
}
