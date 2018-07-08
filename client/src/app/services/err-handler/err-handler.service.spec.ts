import { TestBed, inject } from '@angular/core/testing';

import { ErrHandlerService } from './err-handler.service';

describe('ErrHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrHandlerService]
    });
  });

  it('should be created', inject([ErrHandlerService], (service: ErrHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
