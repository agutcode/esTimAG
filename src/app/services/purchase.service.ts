import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Purchase } from '../modules/purchase/pages/purchase-list/purchase-list.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PurchaseService {

  constructor(private _http: HttpClient) { }

  getPurchases = (id:number) => {
    return this._http.get<Purchase[]>('http://localhost:3000/purchases', {params: new HttpParams().append('userId',id), 
      responseType: 'json'
    });
  }

  getPurchaseById = (id:number) => {
    return this._http.get<Purchase>(`http://localhost:3000/purchases/${id}`, {});
  }

  createPurchase = (newPurchase:Purchase):Observable<Purchase> => {
    return this._http.post<any>(`http://localhost:3000/purchases`, newPurchase)
  }

}

