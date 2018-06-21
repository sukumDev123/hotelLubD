import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../services/users/auth/user-service.service';
import { Router } from '@angular/router';
import * as defualtHeader from '../../../jquery/core.jquery'
import { SignIn } from '../classUser/user.class';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent implements OnInit {
  auth: any = { username: '', password: '', remember: false };
  constructor(private _user: UserServiceService, private _router: Router ) { }

  ngOnInit() {
    this.userComeIn()
    defualtHeader.coreJquery()
  }

  userComeIn() {
    if (this._user.isLogin()) {
      if (this._user.UserData().roles[0] === 'admin') {
        this._router.navigate(['/admin/home'])
      } else {
        this._router.navigate(['/user/home'])
      }
    } 
    
  }

  Login() {
    let signin_ = new SignIn(this.auth.username,this.auth.password)
    this._user.lognInService(signin_.getDataUser()).subscribe(suc => {
      this._user.setSession(suc.id_token)
      this._router.navigate(['/core/home'])
    },err => console.log(err))
  }

  test() {
    let test_ = this._user.createdJwt()
    console.log(test_)
  }
}
