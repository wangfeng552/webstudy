import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers'

// 创建store
export default createStore(rootReducer,applyMiddleware(thunk))