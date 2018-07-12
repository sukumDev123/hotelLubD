import {
  Injectable
} from '@angular/core';
import {
  UserGlobalService
} from '../users/user/user-global.service';
import {
  Router
} from '../../../../node_modules/@angular/router';

import {
  MSG_ADD
} from '../../store/actions/err.action';
import {
  ManagetReducer
} from '../../store/reducers/index.reducer';
import {
  Store
} from '../../../../node_modules/@ngrx/store';
import {
  MessageCreated
} from '../../interface/msg-create.interface';

@Injectable({
  providedIn: 'root'
})
export class ErrHandlerService {

  constructor(private _router: Router, private _user: UserGlobalService, private _state: Store < ManagetReducer > ) {}



  set_msg_type(_msg: string, status: string, type: string, date: number, show_Is: boolean, status_number: number) {
    if (status_number === 401) {
      alert(_msg)
      this._user.Logout()
    }
    let msg_input: MessageCreated = {
      message: _msg,
      status: status,
      type: type,
      date_in: date,
      msg_show: show_Is,
      status_number: status_number

    }
    this._state.dispatch({
      type: MSG_ADD,
      payloads: msg_input
    })
  }


}
