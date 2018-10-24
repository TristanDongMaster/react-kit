import appReducers from './appReducers';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  appReducers,
  routing
});

export default rootReducer;
