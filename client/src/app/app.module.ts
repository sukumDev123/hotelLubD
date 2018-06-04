import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SiginupComponent } from './components/auth/siginup/siginup.component';
import { SignupAdminComponent } from './components/admin/signup-admin/signup-admin.component';
import { ContentAdminComponent } from './components/admin/content-admin/content-admin.component';
import { ContentPriceComponent } from './components/admin/content-price/content-price.component';
import { AdminCoreComponent } from './components/admin/admin-core/admin-core.component';
import { AdminServiceService } from './services/admin/inforS/admin-service.service';

@NgModule({
  declarations: [
    AppComponent,
    SiginupComponent,
    SignupAdminComponent,
    ContentAdminComponent,
    ContentPriceComponent,
    AdminCoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AdminServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
