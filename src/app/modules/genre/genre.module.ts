import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenreRoutingModule } from './genre-routing.module';
import { GenreListComponent } from './pages/genre-list/genre-list.component';
import { CreateGenreComponent } from './pages/create-genre/create-genre.component';
import { UpdateGenreComponent } from './pages/update-genre/update-genre.component';
import { ViewGenreComponent } from './pages/view-genre/view-genre.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GenreFormComponent } from './components/genre-form/genre-form.component';
import { ReactiveFormsModule } from '@angular/forms'

export interface Genre {
  id: number
  name: string
}

@NgModule({
  declarations: [
    GenreListComponent,
    CreateGenreComponent,
    UpdateGenreComponent,
    ViewGenreComponent,
    GenreFormComponent
  ],
  imports: [
    CommonModule,
    GenreRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class GenreModule { }
