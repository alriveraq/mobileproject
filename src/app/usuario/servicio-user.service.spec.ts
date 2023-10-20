import { TestBed } from '@angular/core/testing';

import { ServicioUserService } from './servicio-user.service';

describe('ServicioUserService', () => {
  let service: ServicioUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
