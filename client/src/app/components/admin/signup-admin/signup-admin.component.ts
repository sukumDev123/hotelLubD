import { Component, OnInit } from '@angular/core'
import { AdminServiceService } from '../../../services/admin/inforS/admin-service.service'
import { Router } from '@angular/router'
import { UserServiceService } from '../../../services/users/auth/user-service.service'
import { Signup } from '../../auth/classUser/user.class'
import { UserGlobalService } from '../../../services/users/user/user-global.service';

interface Admin {
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  username: string,
  password: string,
  password2: string,
}
@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.css']
})
export class SignupAdminComponent implements OnInit {
  private tokenAdmin = 'adminlubDRegistery'
  admin :  Admin = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    password2: '',
  }
  
  errMsg : string 
  errStatus : boolean = false
  constructor(private _userService : UserServiceService , private _router : Router ,   private _user : UserGlobalService) { }

  ngOnInit() {
    if(this._user.isLogin()){
      this._router.navigate(['/admin/home'])
    }
  }
  msgError(error) {
    return typeof error == 'object' ? 'Something in fill already exists.' : error
  }
  onSubmit()  {
    let _admin = this.admin
    console.log(_admin)

    let admin_ = new Signup(_admin.firstname,_admin.lastname,_admin.email,_admin.username,_admin.password,_admin.password2,_admin.phone,'admin')
    if(admin_.checkPasswordEqual()) {

      this._userService.signUpService(admin_.getSignIN()).subscribe(suc => {
        this._user.setSession(suc.id_token)
        this._router.navigate(['/admin/home'])
      } ,err => {
        this.errStatus = true
        this.errMsg = this.msgError(err.error.err)
        setTimeout(() => {
          this.errStatus = false 
          this.errMsg = ''
        },3000)
      })
    }

  
    
    
  }

}
