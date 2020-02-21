import { TestBed } from '@angular/core/testing';

import { MealsService } from '../../services/meals.service';

describe('MealsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MealsService = TestBed.get(MealsService);
    expect(service).toBeTruthy();
  });
});
