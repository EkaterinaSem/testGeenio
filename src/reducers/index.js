import { combineReducers } from 'redux';

import list from './list';
import ui from './ui';

export default combineReducers({
  list,
  ui,
});