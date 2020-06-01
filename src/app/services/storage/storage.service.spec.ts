import {TestBed} from '@angular/core/testing';

import {StorageService} from './storage.service';

describe('StorageService', () => {
    let storageService: StorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                StorageService
            ]
        });
        storageService = TestBed.inject(StorageService);
    });

    it('saveToLocalStorage() | getFromLocalStorage()', (doneFn) => {
        const object = {test: 'test'};
        storageService.saveToLocalStorage('test', object);
        storageService.getFromLocalStorage('test').then(val => {
            console.log(val);
            expect(val).toEqual(object);
            doneFn();
        });
    });

    it('removeFromLocalStorage() | Should remove key from Local Storage', (doneFn) => {
        const object = {test: 'Test'};
        storageService.saveToLocalStorage('test', object);
        storageService.getFromLocalStorage('test').then(val => {
          console.log('stored in local', val);
        });
        storageService.removeFromLocalStorage('test').then(val => {
            expect(val).toBe(undefined);
            doneFn();
        });
    });

    it('clearLocalStorage() | Should clear everything from LocalStorage', (doneFn) => {
        const object = {test: 'Test'};
        storageService.saveToLocalStorage('test', object);
        storageService.getFromLocalStorage('test').then(val => {
          console.log('stored in local', val);
        });
        storageService.clearLocalStorage().then(val => {
            expect(val).toBe(undefined);
            doneFn();
        });
    });
});
