import { TestBed } from '@angular/core/testing';

import { HttpCrudService } from './http-crud.service';

describe('HttpCrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpCrudService = TestBed.get(HttpCrudService);
    expect(service).toBeTruthy();
  });
});
