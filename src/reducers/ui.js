import {
  UI_SET_GRANT_VIEW,
} from '../actions/types';

export default function uiReducer(state = { grantSide: 'funded' }, action) {
  switch (action.type) {
    case UI_SET_GRANT_VIEW:
      return {
        ...state,
        grantSide: action.grantSide,
      };
    default:
      return state;
  }
}
