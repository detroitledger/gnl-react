import { SET_ERROR, DISMISS_ERROR } from '../actions/types';

import errorReducer from './errors';

describe('errorReducer', () => {
  it('should return an empty array as initial state', () => {
    expect(errorReducer(undefined, {})).toEqual([]);
  });

  it('should append an error message to an initial state', () => {
    expect(
      errorReducer(undefined, {
        type: SET_ERROR,
        message: 'hi i am error',
      })
    ).toEqual(['hi i am error']);
  });

  it('should remove an error message at a certain index', () => {
    expect(
      errorReducer(
        ['hi i am error one', 'hi i am error two', 'hi i am error three'],
        {
          type: DISMISS_ERROR,
          id: 1,
        }
      )
    ).toEqual(['hi i am error one', 'hi i am error three']);
  });
});
