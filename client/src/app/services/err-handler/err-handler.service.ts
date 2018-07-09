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



  err_handler_msg(msg: string, status: number) {
    
    if (status === 401) {
      alert(msg)
      this._user.Logout()
    }
    let msg_ = this.msg_is_chnage(msg)
    return msg_
  }
  private msg_is_chnage(msg: string) {
    let test = msg.split(' ')
    let new_
    if (test[0] == "E11000") {
      new_ = "รายการนี้มีอยู่ในระบบแล้ว ข้อมูลไม่สามารถซ่ำกันได้ โปรดตรวจสอบข้อมูลให้ดี"
    } else {
      new_ = msg
    }
    return new_
  }



}
