import {
  UI_SET_GRANT_VIEW,
} from '../actions/types';

import uiReducer from './ui';

describe('uiReducer', () => {
  it('should return an initial state', () => {
    expect(uiReducer(undefined, {})).toEqual({ grantSide: 'funded' });
  });

  it('should change the grant side from funded to received', () => {
    expect(uiReducer({ grantSide: 'funded' }, { type: UI_SET_GRANT_VIEW, grantSide: 'received' })).toEqual({
      grantSide: 'received',
    });
  });
});
