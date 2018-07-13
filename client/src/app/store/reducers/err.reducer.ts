import * as err_action from '../actions/err.action'
import {
  MessageCreated
} from '../../interface/msg-create.interface';


const err_test_msg: MessageCreated = {
  message: 'test',
  status: '200',
  date_in: 0,
  type: 'success',
  msg_show: false,
  status_number: 200
}
export function err_reducer(state: MessageCreated = err_test_msg, action: err_action.ActionErr): MessageCreated {
  switch (action.type) {
    case err_action.MSG_ADD:
      {
        return {
          ...state,
          message: action.payloads.message,
          status: action.payloads.status,
          date_in: action.payloads.date_in,
          type: action.payloads.type,
          msg_show: action.payloads.msg_show
        }
      }
    case err_action.OFF_MSG:
      {
        return {
          ...state ,
          msg_show : action.payloads
        }
      }


    default:
      return state
  }
}
