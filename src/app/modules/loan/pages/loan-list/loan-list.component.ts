import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Game } from 'src/app/modules/game/pages/game-list/game-list.component';
import { AuthService, User } from 'src/app/services/auth.service';
import { GameService } from 'src/app/services/game.service';
import { LoanService } from 'src/app/services/loan.service';

export interface Loan{
  ownerId: number,
  userId: number,
  gameId: number,
  finishDate: string,
  gameData?: Game,
  userData?: User,
}

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit{
  loansArray?: any[] 
  loggedUser: User | null
  paymentMethods: string[] = ['', 'Tarjeta de Credito', 'Tarjeta de debito', 'Paypal']

  constructor(
    private _gameService: GameService,
    private _authService: AuthService,
    private _loanService: LoanService,
    private router: Router
  ){
    this.loggedUser = this._authService.getloggedUser();
  }


  ngOnInit(): void {
    this._loanService.getLoans().subscribe((loansData) => {
      const requests = loansData.map((loan) => 
        forkJoin([
          this._authService.getUserById(loan.userId),
          this._gameService.getGameById(loan.gameId)
        ])
      );
  
      forkJoin(requests).subscribe((results) => {
        results.forEach((result, index) => {
          const [userData, gameData] = result;
          loansData[index].userData = userData;
          loansData[index].gameData = gameData;
        });
  
        this.loansArray = loansData;
      });
    });
  }

  cancelLoan = (loanId: number) => {
    this._loanService.deleteLoan(loanId).subscribe({
      complete: () => {
        this.router.navigate(['/loans']);
      }
    })
  }
} 
