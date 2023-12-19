import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Game } from '../../pages/game-list/game-list.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit, OnChanges{

  @Input() isEdit:boolean = false
  @Input() game!:Game 


  submitted: boolean = false
  gameForm: FormGroup;
  genres: any = []

  constructor(private _formBuilder: FormBuilder, private _genreService: GenreService){
    this.gameForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      cpu:["", Validators.required],
      memory:["", Validators.required],
      storage:["", Validators.required],
      gpu:[""],
      price:[0, Validators.required],
      company:["", Validators.required],
      cover:[""],
      genre:["", Validators.required],
      dlc:[false]
    })
  }

  ngOnInit(): void {
    this._genreService.getGenres().subscribe((data) => {
      this.genres = data
    })   
  }
  ngOnChanges(): void {
    if(this.game !== undefined && this.isEdit){
      console.log(this.game)
      this.gameForm.patchValue({
        name: this.game.name,
        description: this.game.description,
        cpu:this.game.cpu,
        memory:this.game.memory,
        storage:this.game.storage,
        gpu:this.game.gpu,
        price:this.game.price,
        company:this.game.company,
        cover:this.game.cover,
        genre:this.game.genre,
        dlc:this.game.dlc
      })
    }
  }
}
