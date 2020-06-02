import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterRoutingModule} from './register-routing.module';
import {RegisterComponent} from './register.component';
import {IonicModule} from '@ionic/angular';
import {AppFormsModule} from '../../core/modules/app-forms.module';

@NgModule({
    declarations: [RegisterComponent],
    imports: [
        CommonModule,
        RegisterRoutingModule,
        IonicModule,
        AppFormsModule
    ]
})
export class RegisterModule {
}
