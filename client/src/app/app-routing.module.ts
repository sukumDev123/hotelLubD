import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiginupComponent } from './components/auth/siginup/siginup.component';
import { SignupAdminComponent } from './components/admin/signup-admin/signup-admin.component';
import { ContentAdminComponent } from './components/admin/content-admin/content-admin.component';
import { ContentPriceComponent } from './components/admin/content-price/content-price.component';
import { AdminCoreComponent } from './components/admin/admin-core/admin-core.component';
import { Page404Component } from './components/page404/page404.component';
import { Page500Component } from './components/page500/page500.component';
import { CoreComponent } from './components/core/core.component';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  {path: 'admin' , component: AdminCoreComponent , children : [
    { path : 'signup' , component : SignupAdminComponent}
  ]},

  { path : 'not/found' , component : Page404Component },  
    
  { path: '', redirectTo: '/core/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/not/found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const AppComponentRoute = [ SiginupComponent,SignupAdminComponent  , ContentAdminComponent,ContentPriceComponent,AdminCoreComponent,Page404Component , Page500Component , CoreComponent , HeaderComponent];