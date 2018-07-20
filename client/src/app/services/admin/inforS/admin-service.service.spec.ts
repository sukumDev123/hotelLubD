import { TestBed, inject } from '@angular/core/testing';

import { AdminServiceService } from './admin-service.service';
import { imports, declarations } from '../../../module.all.test';
import { APP_BASE_HREF } from '@angular/common';

describe('AdminServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminServiceService ,  {
        provide: APP_BASE_HREF,
        useValue: '/'
      }] ,
      imports:[imports] ,
      declarations : [  declarations ] ,
      
    });
  });

  it('should be created', inject([AdminServiceService], (service: AdminServiceService) => {
    expect(service).toBeTruthy();
  }));
});
