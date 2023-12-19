import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoggedInGuard } from './guards/logged-in.guard';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "auth",
    loadChildren: () => 
      import('./modules/auth/auth.module').then((m) =>  m.AuthModule )    
  },
  {
    path: "games",
    loadChildren: () => 
      import('./modules/game/game.module').then((m) =>  m.GameModule )
  },
  {
    path: "genres",
    loadChildren: () => 
      import('./modules/genre/genre.module').then((m) =>  m.GenreModule ) ,
      canActivate: [LoggedInGuard]       
  },
  {
    path: "purchases",
    loadChildren: () => 
      import('./modules/purchase/purchase.module').then((m) =>  m.PurchaseModule ),
      canActivate: [LoggedInGuard]        
  },
  {
    path: "loans",
    loadChildren: () => 
      import('./modules/loan/loan.module').then((m) =>  m.LoanModule )  ,
      canActivate: [LoggedInGuard]      
  },
  {
    path:"**",
    redirectTo: "/",
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
