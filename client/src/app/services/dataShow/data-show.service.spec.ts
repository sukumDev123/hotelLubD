import { TestBed, inject } from '@angular/core/testing';

import { DataShowService } from './data-show.service';
import { APP_BASE_HREF } from '@angular/common';
import { imports, declarations } from '../../module.all.test';

describe('DataShowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataShowService, {
        provide: APP_BASE_HREF,
        useValue: '/'
      }] ,
      imports: [imports] ,
      declarations : [declarations]
    });
  });

  it('should be created', inject([DataShowService], (service: DataShowService) => {
    expect(service).toBeTruthy();
  }));
});
