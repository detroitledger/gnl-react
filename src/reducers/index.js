import { combineReducers } from 'redux';

import errors from './errors';
import form from './form';
import ui from './ui';
import editor from '../editor/reducers';

export default function combiner() {
  return combineReducers({
    errors,
    form,
    ui,
    editor,
  });
}
