import { TestBed, inject } from '@angular/core/testing';

import { UserGlobalService } from './user-global.service';
import { JwtModule } from '../../../../../node_modules/@auth0/angular-jwt';
import { tokenGetter } from '../../../app.module';

describe('UserGlobalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserGlobalService] ,
      imports : [JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          headerName: 'SukumJsonWebToken _1235'
        }
      })]
    });
  });

  it('should be created', inject([UserGlobalService], (service: UserGlobalService) => {
    expect(service).toBeTruthy();
  }));
});
