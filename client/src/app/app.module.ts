import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AppRoutingModule, AppComponentRoute } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AdminServiceService } from './services/admin/inforS/admin-service.service'
import { DataShowService } from './services/dataShow/data-show.service'
import { UserServiceService } from './services/users/auth/user-service.service'
import { StoreModule  } from '@ngrx/store'
import bookingReducer from './reducer/booking.reducer';
import { AuthComponent } from './components/auth/auth/auth.component'

@NgModule({
  declarations: [
    AppComponent,
    ...AppComponentRoute,
    AuthComponent,
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule ,
    StoreModule.forRoot({ booking : bookingReducer })
  ],
  providers: [
    AdminServiceService
    , DataShowService
    ,UserServiceService
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
