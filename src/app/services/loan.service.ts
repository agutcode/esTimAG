import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Loan } from '../modules/loan/pages/loan-list/loan-list.component';
import { AuthService, User } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class LoanService {

  loggedUser!: User | null

  constructor(
    private _http: HttpClient,
    private _authService: AuthService
    ) { 
      this.loggedUser = this._authService.getloggedUser()
    }

  getLoans = () => {
    let id = this.loggedUser ? this.loggedUser.id : 0;
    return this._http.get<Loan[]>('http://localhost:3000/loans', {params: new HttpParams().append('ownerId',id),
      responseType: 'json'
    });
  }

  getLoanById = (id:number) => {
    return this._http.get<Loan>(`http://localhost:3000/loans/${id}`, {});
  }

  createLoan = (newLoan:Loan):Observable<Loan> => {
    return this._http.post<any>(`http://localhost:3000/loans`, newLoan)
  }
  deleteLoan = (id:number) => {
    return this._http.delete(`http://localhost:3000/loans/${id}`)
  }

}

