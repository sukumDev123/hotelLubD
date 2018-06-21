import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataAddHomeComponent } from './components/admin/data-add-home/data-add-home.component';

import { SiginupComponent } from './components/auth/siginup/siginup.component';
import { SignupAdminComponent } from './components/admin/signup-admin/signup-admin.component';
import { ContentAdminComponent } from './components/admin/content-admin/content-admin.component';
import { ContentPriceComponent } from './components/admin/content-price/content-price.component';
import { AdminCoreComponent } from './components/admin/admin-core/admin-core.component';
import { Page404Component } from './components/page404/page404.component';
import { Page500Component } from './components/page500/page500.component';
import { CoreComponent } from './components/core/core.component';
import { HomeComponent } from './components/home/home.component';
import { SiginComponent } from './components/auth/sigin/sigin.component';
import { HistoryComponent } from './components/users/history/history.component';
import { SettingComponent } from './components/users/setting/setting.component';
import { CoreUserComponent } from './components/users/core-user/core-user.component';
import { UserGuard } from './guard/user.guard';
import { AdminGuard } from './guard/admin.guard';
import { AuthComponent } from './components/auth/auth/auth.component';
import { BookingComponent } from './components/booking/booking.component';

const routes: Routes = [
  {
    path: "core", component: CoreComponent, children: [
      { path: "home", component: HomeComponent },
      { path:'booking' , component : BookingComponent },
      { path:"auth" , component:AuthComponent , children: [
        { path: "signin", component: SiginComponent },
        { path: "signup", component: SiginupComponent }
  
      ] },
     
    ]
  },
  {
    path: 'admin', component: AdminCoreComponent,children: [
      { path: 'signup', component: SignupAdminComponent },
      { path: 'home', component: DataAddHomeComponent,  canActivate: [AdminGuard] }
    ]
  },
  {
    path: "user", component: CoreUserComponent, canActivate: [UserGuard], children: [
      { path: "home", component: HistoryComponent }
    ]
  },

  { path: 'not/found', component: Page404Component },
  { path: 'page/problem', component: Page500Component },


  { path: '', redirectTo: '/core/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/not/found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const AppComponentRoute = [
  DataAddHomeComponent
  , SiginupComponent
  , SiginComponent
  , SignupAdminComponent
  , ContentAdminComponent
  , ContentPriceComponent
  , AdminCoreComponent
  , Page404Component
  , Page500Component
  , CoreComponent
  , HomeComponent
  , HistoryComponent
  , SettingComponent
  , CoreUserComponent
  , AuthComponent
  , BookingComponent
];