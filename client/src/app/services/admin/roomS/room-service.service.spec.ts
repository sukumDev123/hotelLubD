import { TestBed, inject } from '@angular/core/testing';

import { RoomServiceService } from './room-service.service';
import { APP_BASE_HREF } from '../../../../../node_modules/@angular/common';
import { imports, declarations } from '../../../module.all.test';

describe('RoomServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomServiceService ,  {
        provide: APP_BASE_HREF,
        useValue: '/'
      }] ,
      imports : [imports] ,
      declarations : [declarations]
    });
  });

  it('should be created', inject([RoomServiceService], (service: RoomServiceService) => {
    expect(service).toBeTruthy();
  }));
});
