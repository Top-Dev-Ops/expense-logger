import {TestBed} from '@angular/core/testing';

import {DataService} from './data.service';
import {ExpenseInterface} from '../../interface/expenseInterface';

describe('DataService', () => {
    let service: DataService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('Should add all the expenses', () => {
        const expectedTotal = 10;
        const mockExpenses: ExpenseInterface[] = [
            {
                amount: 5, type: 'Games', description: 'Games', createdAt: new Date()
            },
            {
                amount: 5, type: 'Movies', description: 'Movies', createdAt: new Date()
            }
        ];
        const actual = service.calculateTodayTotal(mockExpenses);
        expect(actual).toEqual(expectedTotal);
    });
});
