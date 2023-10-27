import { TestBed } from '@angular/core/testing';

import { PerfilserviceService } from './perfilservice.service';

describe('PerfilserviceService', () => {
  let service: PerfilserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
