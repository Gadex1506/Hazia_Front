import { TestBed } from '@angular/core/testing';

import { SemilleroService } from './semillero.service';

describe('AnimalService', () => {
    let service: SemilleroService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SemilleroService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});