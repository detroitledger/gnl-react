import { combineReducers } from 'redux';

const createList = (filter) => {
  const handleUpdate = (state, action) => {
    const { toggledId, done } = action.response;
    const shouldRemove = (
      (done && filter === 'active') ||
      (!done && filter === 'completed')
    );
    return shouldRemove ?
      state.filter(id => id !== toggledId) :
      state;
  };

  const ids = (state = [], action = { type: null }) => {
    switch (action.type) {
      case 'FETCH_USERPDFS_SUCCESS':
        // Since we don't do filtering on the API side, we do it here:
        return Object
          .keys(action.response)
          .filter(id => (
            (!action.response[id].done && filter === 'active') ||
            (action.response[id].done && filter === 'completed')) ||
            (filter === 'all')
          );
      case 'UPDATE_USERPDF_SUCCESS':
        return handleUpdate(state, action);
      case 'RESTORE_PRE_TOUR_STATE':
        return action.oldState.listByFilter[filter].ids;
      default:
        return state;
    }
  };

  // todo: We don't need to keep track of isFetching for each filtered list -- this should be higher up in the state tree!
  const isFetching = (state = false, action = { type: null }) => {
    if (filter !== action.filter) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_USERPDFS_REQUEST':
        return true;
      case 'FETCH_USERPDFS_SUCCESS':
      case 'FETCH_USERPDFS_FAILURE':
        return false;
      default:
        return state;
    }
  };

  // Same here.
  const errorMessage = (state = null, action = { type: null }) => {
    if (filter !== action.filter) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_USERPDFS_FAILURE':
        return action.message;
      case 'FETCH_USERPDFS_REQUEST':
      case 'FETCH_USERPDFS_SUCCESS':
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
    errorMessage,
  });
};

export default createList;

export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;