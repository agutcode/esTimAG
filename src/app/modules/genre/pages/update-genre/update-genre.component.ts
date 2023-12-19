import { Component, OnInit, ViewChild } from '@angular/core';
import { GenreFormComponent } from '../../components/genre-form/genre-form.component';
import { GenreService } from 'src/app/services/genre.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre } from '../../genre.module';

@Component({
  selector: 'app-update-genre',
  templateUrl: './update-genre.component.html',
  styleUrls: ['./update-genre.component.scss']
})
export class UpdateGenreComponent implements OnInit {
  success: boolean = false
  genre!: Genre

  @ViewChild(GenreFormComponent) genreFormComponent!: GenreFormComponent

  constructor(
    private _genreService: GenreService,
    private _activatedRoute: ActivatedRoute,
    private router: Router
    ){}

    
  ngOnInit(): void {
    this._genreService.getGenreById(this._activatedRoute.snapshot.params['id'])
    .subscribe((res) =>  {
      this.genre = res})
  }

  updateGenre = () => {
    this.genreFormComponent.submitted = true
    
    if(!this.isFormValid) return
    const formValues = this.genreFormComponent.genreForm.value
    this._genreService.updateGenre(this._activatedRoute.snapshot.params['id'],formValues).subscribe({
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


