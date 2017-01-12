import configureStore from 'redux-mock-store';

import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_OUT,
} from './types';

import {
  signInUser,
  signOutUser,
  redirectToLoginWithMessage,
} from './auth';

import localStorageMock from '../../__mocks__/localStorage';

import Client from '../../__mocks__/client';

window.localStorage = localStorageMock;

const client = new Client();

describe('signInUser', () => {
  const mockStore = configureStore([]);

  const store = mockStore({});

  const result = signInUser('AzureDiamond', 'hunter2');

  it('should have certain types', function() {
    expect(result.types).toEqual({ REQUEST: SIGN_IN, SUCCESS: SIGN_IN_SUCCESS, FAILURE: SIGN_IN_FAILED });
  });



  it('should provide a promise that sends the login request', () => {
    return result.promise(client).then((res) => {
      expect(res).toEqual('authenticated');
    });
  });

  it('should provide a function to deal with a successful login req', () => {
console.log(signInUser().afterSuccess());
    store.dispatch(signInUser().afterSuccess);
  });
});
