import { browserHistory } from 'react-router';

import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_OUT,
} from './types';

import fetchUser from './user';

export function signInUser(username, password) {
  return {
    types: { REQUEST: SIGN_IN, SUCCESS: SIGN_IN_SUCCESS, FAILURE: SIGN_IN_FAILED },
    promise(client) {
      return client.post('/signin', {
        username,
        password,
      });
    },
    afterSuccess(dispatch, getState, response) {
      if (response.status === 200) {
        dispatch(fetchUser());
        localStorage.setItem('auth-token', getState().auth.token);
        if (getState().routing.locationBeforeTransitions) {
          const routingState = getState().routing.locationBeforeTransitions.state || {};
          browserHistory.push(routingState.nextPathname || '/');
        } else {
          browserHistory.push('/');
        }
      }
    },
  };
}

export function signOutUser() {
  localStorage.removeItem('auth-token');
  return { type: SIGN_OUT };
}

export function redirectToLoginWithMessage() {
  return (dispatch, getState) => {
    if (getState().routing.locationBeforeTransitions) {
      const currentPath = getState().routing.locationBeforeTransitions.pathname;
      browserHistory.replace({ pathname: '/login', state: { nextPathname: currentPath } });
    } else {
      browserHistory.push('/login');
    }
  };
}
