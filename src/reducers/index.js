import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import errors from './errors';
import form from './form';
import ui from './ui';

export default function combiner() {
  return combineReducers({
    errors,
    routing,
    form,
    ui,
  });
}
