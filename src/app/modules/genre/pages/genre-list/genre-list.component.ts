import { Component, OnInit } from '@angular/core';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent implements OnInit {

  GenreArray: any[] = []

  constructor(private _genreService: GenreService){}

  ngOnInit(): void {
    this._genreService.getGenres().subscribe((data) => { this.GenreArray = data })
  }

  deleteGenre = (id:number) => {
    this._genreService.deleteGenre(id).subscribe()
  }

}
