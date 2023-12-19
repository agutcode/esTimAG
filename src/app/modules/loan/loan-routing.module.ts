import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanListComponent } from './pages/loan-list/loan-list.component';
import { LoggedInGuard } from 'src/app/guards/logged-in.guard';

const routes: Routes = [
  {path: '', component: LoanListComponent, canActivate:[LoggedInGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRoutingModule { }
