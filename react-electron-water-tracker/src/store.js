import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { usersReducer } from './reducers/usersReducer';
import { countReducer } from './reducers/countReducer';

const rootReducer = combineReducers({
  users: usersReducer,
  count: countReducer
});

export default createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);
