import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminCoreComponent } from './components/admin/admin-core/admin-core.component';
import { SignupAdminComponent } from './components/admin/signup-admin/signup-admin.component';

const routes: Routes = [
  {path: 'admin' , component: AdminCoreComponent , children : [
    { path : 'signup' , component : SignupAdminComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
