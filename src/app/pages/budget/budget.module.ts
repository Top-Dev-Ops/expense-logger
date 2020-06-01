import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {BudgetComponent} from './budget.component';

@NgModule({
  declarations: [BudgetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: BudgetComponent}])
  ]
})
export class BudgetModule { }
