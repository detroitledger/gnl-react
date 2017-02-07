import {
  GRANTS_SET_VERB,
  GRANTS_SET_IDS,
  APOLLO_QUERY_RESULT,
} from '../actions/types';

export default function grantsReducer(state = { verb: 'funded', ids: [] }, action) {
  debugger;
  switch (action.type) {
    case GRANTS_SET_VERB:
      const verb = action.verb;
      const capitalized = verb.charAt(0).toUpperCase() + verb.slice(1);

      return {
        ...state,
        // Reset filters!
        ids: state[`original${capitalized}Ids`],
        verb,
      };
    case GRANTS_SET_IDS:
      return {
        ...state,
        ids: action.ids,
      };
    // Set some default grants when an organization result comes in.
    case APOLLO_QUERY_RESULT:
      debugger;
      if (action.result.data.hasOwnProperty('ledgerOrganization')) {
        const verb = hasFunded(action.result.data.ledgerOrganization) ? 'funded' : 'received';
        const capitalized = verb.charAt(0).toUpperCase() + verb.slice(1);

        return {
          ...state,
          verb,
          ids: action.result.data.ledgerOrganization[`ledgerGrants${capitalized}`].map((grant) => grant.id),
          originalFundedIds: action.result.data.ledgerOrganization.ledgerGrantsFunded.map((grant) => grant.id),
          originalReceivedIds: action.result.data.ledgerOrganization.ledgerGrantsReceived.map((grant) => grant.id),
        };
      }
    default:
      return state;
  }
}

function hasFunded(orgData) {
  return orgData.hasOwnProperty('ledgerGrantsFunded') && orgData.ledgerGrantsFunded.length > 0;
}
