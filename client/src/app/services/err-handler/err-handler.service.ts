import {
  Injectable
} from '@angular/core';
import {
  UserGlobalService
} from '../users/user/user-global.service';
import {
  Router
} from '../../../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrHandlerService {

  constructor(private _router: Router, private _user: UserGlobalService) {}



  err_handler_msg(msg: any, status: number) {
    let msg_ = JSON.stringify(msg)
    if (status === 401) {
      alert(msg_)
      this._user.Logout()
    }
    return msg_
  }
  



}
