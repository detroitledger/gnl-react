import { combineReducers } from 'redux';

import errors from './errors';
import form from './form';
import ui from './ui';

export default function combiner() {
  return combineReducers({
    errors,
    form,
    ui,
  });
}
