import {
  TestBed,
  async,
  inject
} from '@angular/core/testing';

import {
  AdminGuard
} from './admin.guard';
import {
  imports,
  declarations
} from '../module.all.test';
import { APP_BASE_HREF } from '../../../node_modules/@angular/common';

describe('AdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard, {
        provide: APP_BASE_HREF,
        useValue: '/'
      }],
      declarations: [declarations],
      imports: [imports]
    });
  });

  it('should ...', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
