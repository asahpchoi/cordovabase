import { TestBed, inject } from '@angular/core/testing';

import { PeService } from './pe.service';

describe('PeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeService]
    });
  });

  it('should be created', inject([PeService], (service: PeService) => {
    expect(service).toBeTruthy();
  }));
});
