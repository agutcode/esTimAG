import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseListComponent } from './pages/purchase-list/purchase-list.component';
import { LoggedInGuard } from 'src/app/guards/logged-in.guard';
import { LoanComponent } from './pages/loan/loan.component';

const routes: Routes = [
  {path: '', component: PurchaseListComponent, canActivate:[LoggedInGuard]},
  {path: 'loan/:id', component: LoanComponent, canActivate:[LoggedInGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
