import { TestBed, inject } from '@angular/core/testing';

import { ErrHandlerService } from './err-handler.service';
import { APP_BASE_HREF } from '../../../../node_modules/@angular/common';
import { imports, declarations } from '../../module.all.test';

describe('ErrHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrHandlerService, {
        provide: APP_BASE_HREF,
        useValue: '/'
      }] ,
      imports : [imports] ,
      declarations : [declarations ]
      
    });
  });

  it('should be created', inject([ErrHandlerService], (service: ErrHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
