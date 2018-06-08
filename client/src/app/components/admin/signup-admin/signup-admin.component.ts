import { Component, OnInit } from '@angular/core';
import { Admin } from '../../../interface/adminInterface';
import { AdminServiceService } from '../../../services/admin/inforS/admin-service.service';
import { Router } from '@angular/router';
import { UserServiceService } from '../../../services/users/auth/user-service.service';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.css']
})
export class SignupAdminComponent implements OnInit {
  private tokenAdmin = 'adminlubDRegistery';
  admin :  any = {};
  adminInter : Admin;
  err : any = { status : false} ;
  constructor(private _adminServer : AdminServiceService , private _userService : UserServiceService , private _router : Router) { }

  ngOnInit() {
    if(this._userService.isLogin()){
      this._router.navigate(['/admin/home'])
    }
  }
  onSubmit()  {
    this.adminInter = this.admin;
    if(this.adminInter.firstname != null && this.adminInter.lastname != null && this.adminInter.email != null && this.adminInter.password != null && this.admin.password2 != null) {
      this.err.status = false;
      if(this.adminInter.password === this.admin.password2){
        this._adminServer.signUpAdmin(this.adminInter).subscribe(suc => {
          this._userService.setSession(suc)
        })

      }else{
        this.err.msg =" Please input password equery password again...";
        this.err.status = true;
      }

    }else{
      this.err.msg =" Please input every feils...";
      this.err.status = true;
    }
    
  }

}
