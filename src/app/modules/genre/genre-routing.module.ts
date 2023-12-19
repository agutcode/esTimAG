import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGenreComponent } from './pages/create-genre/create-genre.component';
import { UpdateGenreComponent } from './pages/update-genre/update-genre.component';
import { ViewGenreComponent } from './pages/view-genre/view-genre.component';
import { GenreListComponent } from './pages/genre-list/genre-list.component';

const routes: Routes = [  
  {path:'create', component: CreateGenreComponent},
  {path: 'update/:id', component: UpdateGenreComponent},
  {path: ':id', component: ViewGenreComponent},
  {path: '', component: GenreListComponent},
  {path:'**', redirectTo: 'genres', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenreRoutingModule { }
