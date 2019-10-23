import { TestBed } from '@angular/core/testing';

import { EmployeerService } from './employeer.service';

describe('EmployeerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeerService = TestBed.get(EmployeerService);
    expect(service).toBeTruthy();
  });
});
