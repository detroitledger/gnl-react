import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_SET_ID_TOKEN,
  AUTH_LOGOUT,
} from '../actions/types';

const auth = (state = { idToken: null, user: null, error: null, isFetching: false }, action = { type: null, response: null }) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { idToken: null, user: null, error: null, isFetching: true };
    case AUTH_SUCCESS:
      return { ...state, user: action.response.user, error: null, isFetching: false };
    case AUTH_FAILURE:
      return { idToken: null, user: null, error: action.response.error, isFetching: false };
    case AUTH_SET_ID_TOKEN:
      return { ...state, idToken: action.idToken };
    case AUTH_LOGOUT:
      return { idToken: null, user: null, error: null, isFetching: false };
    default:
      return state;
  }
};

export default auth; 
