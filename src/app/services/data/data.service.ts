import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ExpenseInterface} from '../../interface/expenseInterface';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    // tslint:disable-next-line:variable-name
    private readonly _expenses: BehaviorSubject<ExpenseInterface[]>;
    // tslint:disable-next-line:variable-name
    private readonly _todayTotalExpense: BehaviorSubject<number>;

    constructor() {
        this._expenses = new BehaviorSubject<ExpenseInterface[]>(null);
        this._todayTotalExpense = new BehaviorSubject<number>(0);
    }

    getTodayTotalSubscription(): BehaviorSubject<number> {
        return this._todayTotalExpense;
    }

    async setTodayTotalSubscription(total: number): Promise<void> {
        return this._todayTotalExpense.next(total);
    }

    async getExpenses(): Promise<ExpenseInterface[]> {
        return this._expenses.getValue();
    }

    async setExpenses(expenses: ExpenseInterface[]): Promise<void> {
        if (expenses) {
            this.setTodayTotalSubscription(this.calculateTodayTotal(expenses));
        }
        return this._expenses.next(expenses);
    }

    getExpenseSubscription(): BehaviorSubject<ExpenseInterface[]> {
        return this._expenses;
    }

    calculateTodayTotal(expenses: ExpenseInterface[]): number {
        let total = 0;
        for (const expense of expenses) {
            total += expense.amount;
        }
        return total;
    }
}
