import { TestBed } from '@angular/core/testing';

import { IngredientsService } from '../services/ingredients.service';

describe('IngredientsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IngredientsService = TestBed.get(IngredientsService);
    expect(service).toBeTruthy();
  });
});
