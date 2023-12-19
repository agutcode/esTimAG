import { Component, Input } from '@angular/core';
import { Genre } from '../../genre.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-genre-form',
  templateUrl: './genre-form.component.html',
  styleUrls: ['./genre-form.component.scss']
})
export class GenreFormComponent{

  @Input() isEdit:boolean = false
  @Input() genre!:Genre 


  submitted: boolean = false
  genreForm: FormGroup;
  genres: any = []

  constructor(private _formBuilder: FormBuilder){
    this.genreForm = this._formBuilder.group({
      name: ['', Validators.required]
    })
  }

  ngOnChanges(): void {
    if(this.genre !== undefined && this.isEdit){
      console.log(this.genre)
      this.genreForm.patchValue({
        name: this.genre.name
      })
    }
  }
}