import * as err_action from '../actions/err.action'


export interface Message {
  message: string,
    status: string,
    date_in: number ,
    type : string 
}
export const err_test_msg : Message ={ 
    message : 'test' ,
    status : '200' ,
    date_in : 0 ,
    type : 'success'
}


export function err_reducer(state: Message = err_test_msg, action: err_action.ActionErr): Message {
  switch (action.type) {
    case err_action.MSG_ADD:
      {
        return {
          ...state,
          message: action.payloads.message,
          status: action.payloads.status,
          date_in: action.payloads.date_in,
          type : action.payloads.type
        }
      }


    default:
      return state
  }
}
