import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/modules/game/pages/game-list/game-list.component';
import { AuthService, User } from 'src/app/services/auth.service';
import { GameService } from 'src/app/services/game.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Purchase } from '../purchase-list/purchase-list.component';
import { LoanService } from 'src/app/services/loan.service';


@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss'],
})
export class LoanComponent implements OnInit {
  game!: Game;
  users!: User[];
  loanForm!: FormGroup;
  loggedUser!: User | null;
  purchase!: Purchase

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _loanService: LoanService,
    private _purchaseService: PurchaseService,
    private _gameService: GameService,
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.loggedUser = this._authService.getloggedUser();
  }

  ngOnInit(): void {
    this.loanForm = this._formBuilder.group({
      gameId: [''],
      ownerId: [this.loggedUser?.id],
      userId: ['', Validators.required],
      finishDate: ['', Validators.required],
    });
    this._purchaseService
      .getPurchaseById(this._activatedRoute.snapshot.params['id'])
      .subscribe((res) => {
        this.purchase = res
        
        this.loanForm.patchValue({
          gameId: this.purchase.gameId
        })
        this._gameService
          .getGameById(this.purchase.gameId)
          .subscribe((res) => {
            this.game = res;            
          });
      });
      
    this._authService.getUsers().subscribe((data) => {
      this.users = data
    })  

  }
  createLoan() {
    console.log(this.loanForm);
    if (this.loanForm.valid) {
      this._loanService.createLoan(this.loanForm.value).subscribe({
        complete: () => {
          this.router.navigate(['/loans']);
        },
      });
    }
  }
}
