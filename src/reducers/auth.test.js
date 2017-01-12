import {
  SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILED,
  SIGN_OUT,
} from '../actions/types';

import authReducer from './auth';

describe('authReducer', () => {
  it('should return a default state', () => {
    expect(authReducer(undefined, { type: 'whatever' })).toEqual({
      authenticated: false,
      token: null,
      logging: false,
      errorMsg: '',
    });
  });

  it('should set the logging state to true when you try and sign in', () => {
    expect(authReducer({}, { type: SIGN_IN })).toEqual({
      logging: true,
      errorMsg: 'Logging in...',
    });
  });

  it('should set a token when login succeeds', () => {
    expect(authReducer({ logging: true }, { type: SIGN_IN_SUCCESS, result: { data: 'jrr token' }})).toEqual({
      logging: false,
      token: 'jrr token',
      authenticated: true,
      errorMsg: '',
    });
  });

  it('should respond properly to a failed login', () => {
    expect(authReducer({ logging: true }, { type: SIGN_IN_FAILED })).toEqual({
      authenticated: false,
      errorMsg: 'Incorrect username or password.',
      logging: false,
    });
  });

  it('should sign u out', () => {
    expect(authReducer({ logging: false, authenticated: true, token: 'of my appreciation' }, { type: SIGN_OUT })).toEqual({
      authenticated: false,
      logging: false,
      token: null,
    });
  });
});
