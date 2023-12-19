import { Component, OnInit } from '@angular/core';
import { AuthService, User } from 'src/app/services/auth.service';
import { GameService } from 'src/app/services/game.service';
import { PurchaseService } from 'src/app/services/purchase.service';

export interface Game{
  id:number
  name: string,
  description:string,
  cpu:string,
  memory:string,
  storage:string,
  gpu?:string
  price: number,
  company: string,
  cover: string,
  genre: string,
  dlc:boolean
}

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  gameArray: any[] = []
  loggedUser: User | null

  constructor(
    private _gameService: GameService,
    private _authService: AuthService,
  ){
    this.loggedUser = this._authService.getloggedUser();
  }


  ngOnInit(): void {
    this._gameService.getGames().subscribe((gamesData) => {
        this.gameArray = gamesData;
    })
  }

  deleteGame = (id:number) => {
    this._gameService.deleteGame(id).subscribe((res) => {
      
    })
  }
}
