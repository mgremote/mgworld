import { combineReducers } from 'redux';
import * as records from './records';

export default combineReducers({
  ...records,
});
