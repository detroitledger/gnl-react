import { combineReducers } from 'redux';

import auth from './auth';
import errors from './errors';
import ui from './ui';

export default function combiner() {
  return combineReducers({
    auth,
    errors,
    ui,
  });
}
