import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGameComponent } from './pages/create-game/create-game.component';
import { UpdateGameComponent } from './pages/update-game/update-game.component';
import { ViewGameComponent } from './pages/view-game/view-game.component';
import { GameListComponent } from './pages/game-list/game-list.component';
import { LoggedInGuard } from 'src/app/guards/logged-in.guard';
import { rolePermissionGuard } from 'src/app/guards/role-permission.guard';

const routes: Routes = [
  {path:'create', component: CreateGameComponent, canActivate:[LoggedInGuard, rolePermissionGuard]},
  {path: 'update/:id', component: UpdateGameComponent, canActivate:[LoggedInGuard, rolePermissionGuard]},
  {path: ':id', component: ViewGameComponent},
  {path: '', component: GameListComponent, canActivate:[LoggedInGuard, rolePermissionGuard]},
  {path:'**', redirectTo: 'games', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
