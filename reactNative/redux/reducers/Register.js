import * as types from '../actions/ActionTypes';

const initialState = {
  phone:''
}

// reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。

// 永远不要在 reducer 里做这些操作：
// 修改传入参数；
// 执行有副作用的操作，如 API 请求和路由跳转；
// 调用非纯函数，如 Date.now() 或 Math.random()。

export default function Register(state =initialState, action){
  switch(action.type){
    case types.REGISTER_INPUT_PHONE:
      return Object.assign({},state,{
        phone:action.phone
      })
    default:
      return state;
  }
}