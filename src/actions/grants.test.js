import { setGrantsVerb, setGrantsIds } from './grants';

import {
  GRANTS_SET_VERB,
  GRANTS_SET_IDS,
} from '../actions/types';

describe('setGrantsVerb', () => {
  it('should just return a type and a side', () => {
    expect(setGrantsVerb('funded')).toEqual({
      type: GRANTS_SET_VERB,
      verb: 'funded',
    });
  });
});

describe('setGrantsIds', () => {
  it('should set new grant ids', () => {
    expect(setGrantsIds(['1', '2', '3'])).toEqual({
      type: GRANTS_SET_IDS,
      ids: ['1', '2', '3'],
    });
  });
});
