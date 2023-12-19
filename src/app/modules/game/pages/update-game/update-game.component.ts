import { Component, OnInit, ViewChild } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Game } from '../game-list/game-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GameFormComponent } from '../../components/game-form/game-form.component';

@Component({
  selector: 'app-update-game',
  templateUrl: './update-game.component.html',
  styleUrls: ['./update-game.component.scss']
})
export class UpdateGameComponent implements OnInit{

  @ViewChild(GameFormComponent) gameFormComponent!: GameFormComponent

  game!:Game
  success: boolean = false

  constructor(
    private _activatedRoute: ActivatedRoute, 
    private _gameService: GameService,
    private router: Router
  ){}

  ngOnInit(): void {
    this._gameService.getGameById(this._activatedRoute.snapshot.params['id'])
    .subscribe((res) =>  {
      this.game = res})
  }

  updateGame = () => {
    this.gameFormComponent.submitted = true
    
    if(!this.isFormValid) return
    const formValues = this.gameFormComponent.gameForm.value
    this._gameService.updateGame(this._activatedRoute.snapshot.params['id'], formValues).subscribe({
      next:()=>{
        this.success = true
        setTimeout(() => {
          this.router.navigate(['games'])
        }, 2000)
      }
    })
  }

  get isFormValid(): boolean{
    if(this.gameFormComponent) return this.gameFormComponent.gameForm.valid
    else return false
  }
}
