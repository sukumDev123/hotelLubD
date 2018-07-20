import { TestBed, async, inject } from '@angular/core/testing';

import { UserGuard } from './user.guard';
import { imports, declarations } from '../module.all.test';
import { APP_BASE_HREF } from '@angular/common';

describe('UserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserGuard , {
        provide: APP_BASE_HREF,
        useValue: '/'
      }] ,
      declarations : [declarations],

      imports : [imports]
    });
  });

  it('should ...', inject([UserGuard], (guard: UserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
