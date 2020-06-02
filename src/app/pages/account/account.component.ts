import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage/storage.service';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-settings',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {

    constructor(
        private storageService: StorageService,
        private alertController: AlertController
    ) {
    }

    ngOnInit() {
    }

    resetApp() {
        this.storageService.clearLocalStorage(true).then(() => {
            this.presentAlert();
        });
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            id: 'appResetAlert',
            header: 'App Reset Successful!',
            buttons: ['OK']
        });

        await alert.present();
    }

}
