import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActionSheetController, ModalController} from '@ionic/angular';
import {AddExpenseComponent} from '../../shared/components/add-expense/add-expense.component';
import {DataService} from '../../services/data/data.service';
import {ExpenseInterface} from '../../interface/expenseInterface';
import {SubscriptionLike} from 'rxjs';
import {ActionService} from '../../services/action/action.service';
import {DatetimeService} from '../../services/datetime/datetime.service';
import {ExpenseTypes} from '../../constants/constants';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    expenses: ExpenseInterface[];
    subscription: SubscriptionLike;
    installDate: Date;
    selectedDate: Date;
    dateSubscription: SubscriptionLike;
    todayDate: Date;
    expenseTypes: any;
    selectedType: string;
    totalSubscription: SubscriptionLike;
    todayTotal: number;
    filterByPrice: boolean;
    filterByPriceUp: boolean;

    constructor(
        private modalController: ModalController,
        private dataService: DataService,
        private actionService: ActionService,
        private datetimeService: DatetimeService,
        private actionSheetController: ActionSheetController
    ) {
        this.installDate = this.datetimeService.installDate;
        this.todayDate = this.datetimeService.getCurrentDatetime();
        this.expenseTypes = ExpenseTypes;
        this.todayTotal = null;
    }

    ngOnInit() {
        this.totalSubscription = this.dataService.getTodayTotalSubscription()
            .subscribe({
                next: (total) => {
                    this.todayTotal = total;
                },
                error: err => {
                    console.log(err);
                },
                complete: () => {
                }
            });
        this.dateSubscription = this.datetimeService.getSelectedDateSubscription()
            .subscribe({
                next: (date) => {
                    this.selectedDate = date;
                },
                error: err => {
                    console.log(err);
                },
                complete: () => {
                }
            });
        this.subscription = this.dataService.getExpenseSubscription()
            .subscribe({
                next: (expense) => {
                    if (!this.expenses) {
                        this.expenses = [];
                    }
                    if (expense != null) {
                        this.expenses = expense;
                    }
                },
                error: err => {
                    console.log(err);
                },
                complete: () => {
                }
            });
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: AddExpenseComponent,
            cssClass: 'my-custom-class'
        });
        return await modal.present();
    }

    ngOnDestroy(): void {
    }

    changeSelectedDate(value): void {
        this.selectedDate = this.datetimeService.createDateFromString(value);
        this.datetimeService.setSelectedDate(value).then(() => {
            this.actionService.emitExpensesByDate(this.selectedDate);
        });
    }

    setCurrentTodayDate(): void {
        this.datetimeService.setSelectedDate(this.datetimeService.getCurrentDatetime()).then(() => {
            this.actionService.emitExpensesByDate(this.selectedDate);
        });
    }

    priceFilter(): void {
        this.expenses = this.expenses.sort((a, b) => {
            if (a.amount > b.amount) {
                return this.filterByPriceUp ? 1 : -1;
            }
            if (b.amount > a.amount) {
                return this.filterByPriceUp ? -1 : 1;
            }
            return 0;
        });
        this.filterByPrice = true;
        this.filterByPriceUp = !this.filterByPriceUp;
    }

    async presentFilterActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Albums',
            cssClass: 'my-custom-class',
            buttons: [{
                text: 'Price',
                icon: 'logo-usd',
                handler: () => {
                    console.log('Share clicked');
                }
            }, {
                text: 'Recent',
                icon: 'document-outline',
                handler: () => {
                    console.log('Play clicked');
                }
            }, {
                text: 'Cancel',
                icon: 'close',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
        });
        await actionSheet.present();
    }
}
