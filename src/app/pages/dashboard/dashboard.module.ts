import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {IonicModule} from '@ionic/angular';
import {SharedModule} from '../../shared/shared.module';
import {CategoryPipe} from '../../pipes/category.pipe';

@NgModule({
    declarations: [DashboardComponent, CategoryPipe],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: DashboardComponent}]),
        IonicModule,
        SharedModule
    ]
})
export class DashboardModule {
}
