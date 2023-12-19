import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, map, tap } from 'rxjs'

export interface User {  
  id: number,
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  role: string
}
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient) { }

  checkUser(formValues:any): Observable<any> {
    
    // Construir el encabezado de autorización con las credenciales
    let email:string =  formValues.email;
    let password:string = formValues.password;

    // Realizar la solicitud GET
    return this._http.get<User[]>(`http://localhost:3000/users`, {params: new HttpParams().append('email',email).append('password', password)}).pipe(
      map(response => {
      if (response && response.length > 0) {
        const userData: User = response[0];
        return userData;
      } else {
        throw new Error('Invalid email or password');
      }
    }),
    tap(userData => {
      sessionStorage.setItem('loggedUser', JSON.stringify(userData));
    }),

    );    
  }

  getUsers = () => {
    return this._http.get<User[]>('http://localhost:3000/users', {
      responseType: 'json'
    });
  }
  
  getUserById = (id:number) => {
    return this._http.get<User>(`http://localhost:3000/users/${id}`, {});
  }
  getloggedUser(): User | null {
    const userData = sessionStorage.getItem('loggedUser');
    return userData ? JSON.parse(userData) : null;
  }
  logOut = () => {
    sessionStorage.removeItem('loggedUser');    
    return null;
  }
}
