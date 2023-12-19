import { Component, OnInit } from '@angular/core';
import { Game } from '../game/pages/game-list/game-list.component';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit{ 
  constructor(private _gamesService: GameService){}

  games: Game[] = []

  ngOnInit():void {
    this._gamesService.getGames().subscribe((res) => {
      this.games = res
    })
  }
}
