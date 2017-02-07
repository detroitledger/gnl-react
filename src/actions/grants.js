import {
  GRANTS_SET_VERB,
  GRANTS_SET_IDS,
} from '../actions/types';

export function setGrantsVerb(verb) {
  return {
    type: GRANTS_SET_VERB,
    verb,
  };
}

export function setGrantsIds(ids) {
  return {
    type: GRANTS_SET_IDS,
    ids,
  };
}
