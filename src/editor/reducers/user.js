const user = (state = { id: null, name: null, isFetching: true }, action = { type: null, response: null}) => {
  switch (action.type) {
    case 'FETCH_CURRENTUSER_REQUEST':
      return { ...state, isFetching: true };
    case 'FETCH_CURRENTUSER_SUCCESS':
      return { ...state, ...action.response, isFetching: false };
      case 'FETCH_CURRENTUSER_FAILURE':
        return { ...state, isFetching: false };
    default:
      return state;
  }
};

export default user;