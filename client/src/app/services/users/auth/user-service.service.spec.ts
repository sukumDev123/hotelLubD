import { TestBed, inject } from '@angular/core/testing';

import { UserServiceService } from './user-service.service';
import { APP_BASE_HREF } from '../../../../../node_modules/@angular/common';
import { imports, declarations } from '../../../module.all.test';

describe('UserServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserServiceService, {
        provide: APP_BASE_HREF,
        useValue: '/'
      }],
      imports : [imports] ,
      declarations : [declarations]
    });
  });

  it('should be created', inject([UserServiceService], (service: UserServiceService) => {
    expect(service).toBeTruthy();
  }));
});
