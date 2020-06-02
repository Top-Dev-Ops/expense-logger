import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DatetimeService {

    // tslint:disable-next-line:variable-name
    private _installDate: Date;
    // tslint:disable-next-line:variable-name
    private _selectedDate: BehaviorSubject<Date>;

    constructor() {
        this._selectedDate = new BehaviorSubject<Date>(this.getCurrentDatetime());
    }

    getSelectedDateSubscription(): BehaviorSubject<Date> {
        return this._selectedDate;
    }

    async getSelectedDate(): Promise<Date> {
        return this._selectedDate.getValue();
    }

    async setSelectedDate(date: Date | string): Promise<void> {
        return this._selectedDate.next(typeof date === 'string' ? this.createDateFromString(date) : date);
    }

    getCurrentDatetime(): Date {
        return moment().toDate();
    }

    createDateFromString(date: string): Date {
        return moment(date).toDate();
    }

    getDatetimeISO(date?: Date): string {
        return date ? moment(date).format('L') : moment().format('L');
    }

    get installDate(): Date {
        return this._installDate;
    }

    set installDate(value: Date) {
        this._installDate = value;
    }
}
