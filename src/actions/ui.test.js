import { setGrantSide } from './ui';

import {
  UI_SET_GRANT_VIEW,
} from '../actions/types';

describe('setGrantSide', () => {
  it('should just return a type and a side', () => {
    expect(setGrantSide('funded')).toEqual({
      type: UI_SET_GRANT_VIEW,
      grantSide: 'funded',
    });
  });
});
