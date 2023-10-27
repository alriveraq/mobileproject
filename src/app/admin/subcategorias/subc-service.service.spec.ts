import { TestBed } from '@angular/core/testing';

import { SubcServiceService } from './subc-service.service';

describe('SubcServiceService', () => {
  let service: SubcServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
