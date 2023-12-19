import { Component, OnInit, ViewChild } from '@angular/core';
import { GameFormComponent } from '../../components/game-form/game-form.component';
import { Game } from '../game-list/game-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { AuthService, User } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-view-game',
  templateUrl: './view-game.component.html',
  styleUrls: ['./view-game.component.scss'],
})
export class ViewGameComponent implements OnInit {
  
  purchaseForm!: FormGroup;
  game!: Game;
  loggedUser: User | null

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _gameService: GameService,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _purchaseService: PurchaseService,
    private router: Router
  ) {
    this.loggedUser = this._authService.getloggedUser();
  }

  ngOnInit(): void {
    this._gameService
      .getGameById(this._activatedRoute.snapshot.params['id'])
      .subscribe((res) => {
        this.game = res;

        this.purchaseForm = this._formBuilder.group({
          gameId: [this.game.id],
          userId:[this.loggedUser?.id],
          price:[this.game.price],
          paymentMethod:["", Validators.required]
        })
      });
    
  }
  createPurchase() {
    if(this.purchaseForm.valid){
      this._purchaseService.createPurchase(this.purchaseForm.value).subscribe({
        complete: () => {
          this.router.navigate(['/purchases']);
        }
      })
    }
  }
}
