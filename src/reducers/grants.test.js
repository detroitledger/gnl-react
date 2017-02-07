import {
  GRANTS_SET_VERB,
  GRANTS_SET_IDS,
} from '../actions/types';

import grantsReducer from './grants';

describe('grantsReducer', () => {
  it('should return an initial state', () => {
    expect(grantsReducer(undefined, {})).toEqual({ verb: 'funded', ids: [] });
  });

  it('should change the grant side from funded to received', () => {
    expect(grantsReducer({ verb: 'funded' }, { type: GRANTS_SET_VERB, verb: 'received' })).toEqual({
      verb: 'received',
    });
  });

  it('should keep track of grant IDs to display', () => {
    expect(grantsReducer({ ids: [1, 2, 4] }, { type: GRANTS_SET_IDS, ids: [3, 4, 5] })).toEqual({
      ids: [3, 4, 5],
    });
  });
});
