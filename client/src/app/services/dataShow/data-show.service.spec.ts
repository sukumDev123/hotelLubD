import { TestBed, inject } from '@angular/core/testing';

import { DataShowService } from './data-show.service';

describe('DataShowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataShowService]
    });
  });

  it('should be created', inject([DataShowService], (service: DataShowService) => {
    expect(service).toBeTruthy();
  }));
});
