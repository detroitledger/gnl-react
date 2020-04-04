import { UI_SET_GRANT_VIEW } from '../actions/types';

export function setGrantSide(grantSide) {
  return {
    type: UI_SET_GRANT_VIEW,
    grantSide,
  };
}
