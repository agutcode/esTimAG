import { Component, ViewChild } from '@angular/core';
import { GenreFormComponent } from '../../components/genre-form/genre-form.component';
import { GenreService } from 'src/app/services/genre.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-genre',
  templateUrl: './create-genre.component.html',
  styleUrls: ['./create-genre.component.scss']
})
export class CreateGenreComponent {
  success: boolean = false

  @ViewChild(GenreFormComponent) genreFormComponent!: GenreFormComponent

  constructor(
    private _genreService: GenreService,
    private router: Router
    ){}

  createGenre = () => {
    this.genreFormComponent.submitted = true
    
    if(!this.isFormValid) return
    const formValues = this.genreFormComponent.genreForm.value
    this.genreFormComponent.genreForm.reset()
    this._genreService.createGenre(formValues).subscribe({
      next:()=>{
        this.success = true
        setTimeout(() => {
          this.router.navigate(['genres'])
        }, 2000)
      }
    })
  }

  get isFormValid(): boolean{
    if(this.genreFormComponent) return this.genreFormComponent.genreForm.valid
    else return false
  }
}
