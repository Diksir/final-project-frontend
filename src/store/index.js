import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const initialState = {};
const middleWare = [thunk];

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(...middleWare))
    : applyMiddleware(...middleWare);

export const store = createStore(rootReducer, initialState, composeEnhancers);
