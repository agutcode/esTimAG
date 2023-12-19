import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameListComponent } from './pages/game-list/game-list.component';
import { CreateGameComponent } from './pages/create-game/create-game.component';
import { UpdateGameComponent } from './pages/update-game/update-game.component';
import { ViewGameComponent } from './pages/view-game/view-game.component';
import { GameFormComponent } from './components/game-form/game-form.component';
import { ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    GameListComponent,
    CreateGameComponent,
    UpdateGameComponent,
    ViewGameComponent,
    GameFormComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class GameModule { }
