import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../services/users/auth/user-service.service';
import { Router } from '@angular/router';
import * as defualtHeader from '../../../jquery/core.jquery'

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent implements OnInit {
  auth: any = { username: '', password: '', remember: false };
  constructor(private _user: UserServiceService, private _router: Router ) { }

  ngOnInit() {
    this.userComeIn();
    defualtHeader.coreJquery()
  }

  userComeIn() {
    if (this._user.isLogin()) {
      if (this._user.getSession().roles[0] === 'admin') {
        this._router.navigate(['/admin/home'])
      } else {
        this._router.navigate(['/user/home'])
      }
    } 
    
  }

  Login() {
    this._user.lognInService(this.auth).subscribe(suc => {
      this._user.setSession(suc);
      if (this._user.isLogin()) {
        this.userComeIn();

      }
    }, err => console.log(err))
  }
}
