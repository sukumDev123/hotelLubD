import * as err_action from '../actions/err.action'


export interface MessageCreated {
  message: string,
    status: string,
    date_in: number,
    type: string ,
    msg_show:boolean
}
export const err_test_msg: MessageCreated = {
  message: 'test',
  status: '200',
  date_in: 0,
  type: 'success' ,
  msg_show : false 
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
          msg_show : action.payloads.msg_show
        } 
      }


    default:
      return state
  }
}
