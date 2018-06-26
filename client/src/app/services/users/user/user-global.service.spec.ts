import { TestBed, inject } from '@angular/core/testing';

import { UserGlobalService } from './user-global.service';

describe('UserGlobalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserGlobalService]
    });
  });

  it('should be created', inject([UserGlobalService], (service: UserGlobalService) => {
    expect(service).toBeTruthy();
  }));
});
