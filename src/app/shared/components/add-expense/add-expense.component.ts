import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActionService} from '../../../services/action/action.service';
import {DatetimeService} from '../../../services/datetime/datetime.service';
import {ExpenseTypes} from '../../../constants/constants';
import {ExpenseInterface} from '../../../interface/expenseInterface';

@Component({
    selector: 'app-add-expense',
    templateUrl: './add-expense.component.html',
    styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {

    expenseTypes: any;

    addExpenseForm = new FormGroup({
        amount: new FormControl('', Validators.required),
        description: new FormControl(''),
        type: new FormControl('', Validators.required)
    });

    constructor(
        private modalController: ModalController,
        private actionService: ActionService,
        private datetimeService: DatetimeService
    ) {
        this.expenseTypes = ExpenseTypes;
    }

    ngOnInit() {
    }

    initCreateExpense(): void {
        const expense: ExpenseInterface = this.addExpenseForm.value;
        expense.amount = Number(expense.amount.toFixed(2));
        this.datetimeService.getSelectedDate()
            .then((date) => {
                if (!expense.createdAt) {
                    expense.createdAt = date;
                }
            }).then(() => {
            this.actionService.createExpense(expense).then(() => {
                this.dismissModal();
                console.log('created');
            }).catch((err) => console.log(err));
        });
    }

    dismissModal(): void {
        this.modalController.dismiss().then().catch();
    }
}
