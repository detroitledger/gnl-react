const grants = (state = { isCreating: false, byId: {} }, action = { type: null, response: null}) => {
  switch (action.type) {
    case 'CREATE_GRANT_REQUEST':
      return { ...state, isCreating: true };
    case 'CREATE_GRANT_SUCCESS':
      return {
          ...state,
          isCreating: false,
          byId: {
              ...state.byId,
              [action.response.id]: action.response,
          },
      };
      case 'CREATE_GRANT_FAILURE':
        return { ...state, isCreating: false };
    default:
      return state;
  }
};

export default grants;