import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, AppComponentRoute } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminServiceService } from './services/admin/inforS/admin-service.service';
import { HomeComponent } from './components/home/home.component';
import { DataShowService } from './services/dataShow/data-show.service';
import { AuthInterceprot } from './auth-interceprot';




@NgModule({
  declarations: [
    AppComponent,
    AppComponentRoute,
    HomeComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AdminServiceService
    , DataShowService
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
