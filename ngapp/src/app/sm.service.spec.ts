import { TestBed, inject } from '@angular/core/testing';

import { SmService } from './sm.service';

describe('SmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmService]
    });
  });

  it('should be created', inject([SmService], (service: SmService) => {
    expect(service).toBeTruthy();
  }));
});
