import { TestBed } from '@angular/core/testing';

import { ProductouserServiceService } from './productouser-service.service';

describe('ProductouserServiceService', () => {
  let service: ProductouserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductouserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
