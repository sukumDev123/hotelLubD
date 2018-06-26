import {
  Component,
  OnInit
} from '@angular/core'
import * as defualtHeader from '../../../jquery/core.jquery'
import {
  Signup
} from '../classUser/user.class'
import { UserServiceService } from '../../../services/users/auth/user-service.service'
import { Router } from '@angular/router'
import { UserGlobalService } from '../../../services/users/user/user-global.service';
@Component({
  selector: 'app-siginup',
  templateUrl: './siginup.component.html',
  styleUrls: ['./siginup.component.css']
})


export class SiginupComponent implements OnInit {
  auth = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    password2: '',
  }
  errStatus : boolean  = false 
  errMsg : string
  constructor(private _auth : UserServiceService , private _router : Router , private _user : UserGlobalService) {}
  
  ngOnInit() {

    defualtHeader.coreJquery()
  }
  msgError(error) {
    return typeof error == 'object' ? 'Something in fill already exists.' : error
  }
  signInSubmit() {
    let signUp_ = new Signup(this.auth.firstname, this.auth.lastname, this.auth.email, this.auth.username, this.auth.password, this.auth.password2, this.auth.phone , 'user')

    if (signUp_.checkPasswordEqual()) {
      this._auth.signUpService(signUp_.getSignIN()).subscribe(suc => {
        this._user.setSession(suc.id_token)
        this._router.navigate(['/core/home'])
      } , err => {
        this.errStatus = true
        this.errMsg = this.msgError(err.error.err)
         
        setTimeout(() => {

          this.errStatus = false 
          this.errMsg = ''
        },3000)
      } )
    }
  }
}
