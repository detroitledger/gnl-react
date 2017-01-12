import {
  FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILED,
} from './types';

export default function fetchUser() {
  return {
    types: { REQUEST: FETCH_USER, SUCCESS: FETCH_USER_SUCCESS, FAILURE: FETCH_USER_FAILED },
    promise: client => client.post('/user'),
  };
}

