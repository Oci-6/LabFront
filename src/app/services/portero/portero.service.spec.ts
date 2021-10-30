import { TestBed } from '@angular/core/testing';

import { PorteroService } from './portero.service';

describe('PorteroService', () => {
  let service: PorteroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PorteroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
