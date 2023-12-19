import { Component, ViewChild } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { GameFormComponent } from '../../components/game-form/game-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent {

  success:boolean = false

  @ViewChild(GameFormComponent) gameFormComponent!: GameFormComponent

  constructor(
    private _gameService: GameService,
    private router: Router
    ){}

  createGame = () => {
    this.gameFormComponent.submitted = true
    
    if(!this.isFormValid) return
    const formValues = this.gameFormComponent.gameForm.value
    this.gameFormComponent.gameForm.reset()
    this._gameService.createGame(formValues).subscribe({
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
