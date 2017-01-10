import {
  FORM_SET_CSRF_TOKEN
} from '../actions/types';

import formReducer from './form';

describe('formReducer', () => {
  it('should return an empty object as initial state', () => {
    expect(formReducer(undefined, {})).toEqual({});
  });

  it('should set a csrf token', () => {
    expect(formReducer(undefined, {
      type: FORM_SET_CSRF_TOKEN,
      token: 'hi i am token',
    })).toEqual({
      csrfToken: 'hi i am token',
    });
  });
});
