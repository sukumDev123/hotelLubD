import {
  BrowserModule
} from '@angular/platform-browser'
import {
  NgModule
} from '@angular/core'
import {
  FormsModule
} from '@angular/forms'
import {
  AppRoutingModule,
  AppComponentRoute
} from './app-routing.module'
import {
  AppComponent
} from './app.component'
import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http'
import {
  AdminServiceService
} from './services/admin/inforS/admin-service.service'
import {
  DataShowService
} from './services/dataShow/data-show.service'
import {
  UserServiceService
} from './services/users/auth/user-service.service'
import {
  StoreModule
} from '@ngrx/store'
import {
  JwtModule
} from '@auth0/angular-jwt';
import {
  AuthInterceprot
} from './auth.interceptor';
import {
  ForRoomShowComponent
} from './components/for-room-show/for-room-show.component';
import {
  reducer_total
} from './store/reducers/index.reducer';
import {
  ErrComponentComponent
} from './components/err-component/err-component.component';
import { UserGlobalService } from './services/users/user/user-global.service';
import { DetailBookingListUserComponent } from './components/detail-booking-list-user/detail-booking-list-user.component';
import { NgbModule, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap'
export function tokenGetter() {
  return localStorage.getItem('Login')
}

@NgModule({
  declarations: [
    AppComponent,
    ForRoomShowComponent,
    ErrComponentComponent,
    ...AppComponentRoute,
    DetailBookingListUserComponent,

    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    StoreModule.forRoot(reducer_total),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        headerName: 'SukumJsonWebToken _1235'
      }
    })
  ],
  providers: [
    AdminServiceService, DataShowService, UserServiceService,UserGlobalService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceprot,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
