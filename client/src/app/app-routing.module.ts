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

const routes: Routes = [
  {
    path: 'admin', component: AdminCoreComponent, children: [
      { path: 'signup', component: SignupAdminComponent }
    ]
  },
  {
    path: "core", component: CoreComponent, children: [
      { path: "home", component: HomeComponent }
    ]
  },
  { path: 'not/found', component: Page404Component },

  { path: '', redirectTo: '/core/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/not/found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const AppComponentRoute = [DataAddHomeComponent
  , SiginupComponent
  , SignupAdminComponent
  , ContentAdminComponent
  , ContentPriceComponent
  , AdminCoreComponent
  , Page404Component
  , Page500Component
  , CoreComponent
  , HomeComponent
];