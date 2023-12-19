import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Game } from 'src/app/modules/game/pages/game-list/game-list.component';
import { AuthService, User } from 'src/app/services/auth.service';
import { GameService } from 'src/app/services/game.service';
import { PurchaseService } from 'src/app/services/purchase.service';

export interface Purchase {
  id: number,
  gameId: number,
  userId: number,
  paymentMethod: number,
  price: number,
  gameData?: Game
}

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})

export class PurchaseListComponent implements OnInit {
  purchasedGamesArray: any[] = []
  loggedUser!: User | null
  paymentMethods: string[] = ['', 'Tarjeta de Credito', 'Tarjeta de debito', 'Paypal']

  constructor(
    private _gameService: GameService,
    private _authService: AuthService,
    private _purchaseService: PurchaseService
  ){
    this.loggedUser = this._authService.getloggedUser();
  }


  ngOnInit(): void {
    let id = this.loggedUser ? this.loggedUser.id : 0;
    this._purchaseService.getPurchases(id).subscribe((purchasedGamesData) => {
      console.log(purchasedGamesData);
      const requests = purchasedGamesData.map(purchase => this._gameService.getGameById(purchase.gameId));

      forkJoin(requests).subscribe((gameDataArray) => {
  
        purchasedGamesData.forEach((purchase, index) => {
          purchase.gameData = gameDataArray[index]; 
        });

        this.purchasedGamesArray = purchasedGamesData
      })
    })
  }
} 
