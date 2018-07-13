import { TestBed, inject } from '@angular/core/testing';

import { UserGlobalService } from './user-global.service';
import { JwtModule } from '../../../../../node_modules/@auth0/angular-jwt';
import { tokenGetter } from '../../../app.module';
import { APP_BASE_HREF } from '../../../../../node_modules/@angular/common';
import { imports, declarations } from '../../../module.all.test';

describe('UserGlobalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserGlobalService , {
        provide: APP_BASE_HREF,
        useValue: '/'
      } ] ,
      imports : [imports] ,
      declarations : [declarations]
    });
  });

  it('should be created', inject([UserGlobalService], (service: UserGlobalService) => {
    expect(service).toBeTruthy();
  }));
});
