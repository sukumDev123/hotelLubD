import {
  Injectable
} from '@angular/core';
import {
  UserGlobalService
} from '../users/user/user-global.service';
import {
  Router
} from '../../../../node_modules/@angular/router';

import { MSG_ADD } from '../../store/actions/err.action';
import { ManagetReducer } from '../../store/reducers/index.reducer';
import { Store } from '../../../../node_modules/@ngrx/store';
import { MessageCreated } from '../../store/reducers/err.reducer';

@Injectable({
  providedIn: 'root'
})
export class ErrHandlerService {

  constructor(private _router: Router, private _user: UserGlobalService , private _state : Store<ManagetReducer> ) {}



  err_handler_msg(msg: any, status: number) {
    let msg_ = JSON.stringify(msg)
    if (status === 401) {
      alert(msg_)
      this._user.Logout()
    }
    return msg_
  }

  set_msg_type(_msg: string, status: string, type: string, date: number, show_Is: boolean) {
    let msg_input: MessageCreated = {
      message: _msg,
      status: status,
      type: type,
      date_in: date,
      msg_show: show_Is

    }
    this._state.dispatch({
      type: MSG_ADD,
      payloads: msg_input
    })
  }


}
