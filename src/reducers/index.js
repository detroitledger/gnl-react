import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import errors from './errors';
import auth from './auth';
import user from './user';
import form from './form';

export default function combiner(apolloClient) {
  return combineReducers({
    errors,
    auth,
    user,
    routing,
    form,
    apollo: apolloClient.reducer(),
  });
}
