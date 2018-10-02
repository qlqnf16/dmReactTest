import { combineReducers } from 'redux';
import authentication from './authentication';

export * from './authentication';
export default combineReducers({
  authentication
});
