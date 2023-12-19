import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Game } from '../modules/game/pages/game-list/game-list.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GameService {

  constructor(private _http: HttpClient) { }

  getGames = () => {
    return this._http.get<Game[]>('http://localhost:3000/games', {
      responseType: 'json'
    });
  }

  getGameById = (id:number) => {
    return this._http.get<Game>(`http://localhost:3000/games/${id}`, {});
  }

  createGame = (newGame:Game):Observable<Game> => {
    return this._http.post<any>(`http://localhost:3000/games`, newGame)
  }

  updateGame = (id:number, data:Game):Observable<Game> => {
    return this._http.put<any>(`http://localhost:3000/games/${id}`, data)
  }

  deleteGame = (id:number) => {
    return this._http.delete(`http://localhost:3000/games/${id}`)
  }
}

