import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

import {composeWithDevTools} from 'redux-devtools-extension';
const enhancers = composeWithDevTools(applyMiddleware(thunk));
/** * 创建store */
export default createStore(rootReducer, enhancers);
