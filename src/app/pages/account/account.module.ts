import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AccountComponent} from './account.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: AccountComponent}]),
    IonicModule
  ]
})
export class AccountModule { }
