import {
  FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILED,
  SIGN_OUT,
} from '../actions/types';

import userReducer from './user';

describe('userReducer', () => {
  it('should return an unauthenticated user object as initial state', () => {
    expect(userReducer(undefined, {})).toEqual({ currentUser: null, loading: false });
  });

  it('should set state as loading from empty state when requesting a fetch', () => {
    expect(userReducer(undefined, { type: FETCH_USER })).toEqual({ currentUser: null, loading: true });
  });

  it('should apply user data if it exists after fetching', () => {
    expect(userReducer({ loading: true }, {
      type: FETCH_USER_SUCCESS,
      result: { data: { user: 'fred' } },
    })).toEqual({
      loading: false,
      currentUser: { user: 'fred' }
    });
  });

  it('should set user data as null if it does not exist after fetching', () => {
    expect(userReducer({}, { type: FETCH_USER_SUCCESS, result: false })).toEqual({ loading: false, currentUser: null });
  });

  it('should set loading to false if the fetch fails', () => {
    expect(userReducer({ loading: true }, { type: FETCH_USER_FAILED })).toEqual({ loading: false });
  });
});
