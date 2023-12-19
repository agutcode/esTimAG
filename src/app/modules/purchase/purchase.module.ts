import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseListComponent } from './pages/purchase-list/purchase-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoanComponent } from './pages/loan/loan.component';


@NgModule({
  declarations: [
    PurchaseListComponent,
    LoanComponent
  ],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PurchaseModule { }
