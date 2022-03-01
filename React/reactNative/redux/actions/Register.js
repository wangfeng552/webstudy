import * as types from './ActionTypes';

export function inputPhone(text){
  return {
    type:types.REGISTER_INPUT_PHONE,
    phone:text
  }
}