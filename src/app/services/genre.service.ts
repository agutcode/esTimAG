import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre } from '../modules/genre/genre.module';
import {Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GenreService {

    constructor(private _http: HttpClient) { }
  
    getGenres = () => {
      return this._http.get<Genre[]>('http://localhost:3000/genres', {
        responseType: 'json'
      });
    }
  
    getGenreById = (id:number) => {
      return this._http.get<Genre>(`http://localhost:3000/genres/${id}`, {});
    }
  
    createGenre = (newGenre:Genre):Observable<Genre> => {
      return this._http.post<any>(`http://localhost:3000/genres`, newGenre)
    }

    updateGenre = (id:number, data:Genre):Observable<Genre> => {
      return this._http.put<any>(`http://localhost:3000/genres/${id}`, data)
    }
  
    deleteGenre = (id:number) => {
      return this._http.delete(`http://localhost:3000/genres/${id}`)
    }

  }
