import {
  Component,
  OnInit
} from '@angular/core';
import * as defualtHeader from '../../../jquery/core.jquery'
import {
  Signup
} from '../classUser/user.class';
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
  constructor() {}

  ngOnInit() {

    defualtHeader.coreJquery()
  }
  signInSubmit() {
    let signUp_ = new Signup(this.auth.firstname, this.auth.lastname, this.auth.email, this.auth.username, this.auth.password, this.auth.password2, this.auth.phone , 'user')

    if (signUp_.checkPasswordEqual()) {

    

    }
  }
}
