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
import bookingReducer from './reducer/booking.reducer';
import {
  JwtModule
} from '@auth0/angular-jwt';
import {
  AuthInterceprot
} from './auth.interceptor';

function tokenGetter() {
  return localStorage.getItem('Login')
}

@NgModule({
  declarations: [
    AppComponent,
    ...AppComponentRoute
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      booking: bookingReducer
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        headerName: 'SukumJsonWebToken _1235'
      }
    })
  ],
  providers: [
    AdminServiceService, DataShowService, UserServiceService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceprot,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
