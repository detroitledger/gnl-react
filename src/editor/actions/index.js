import { push } from 'react-router-redux';

import * as api from '../api';
import { getIsFetching } from '../reducers';

export const fetchUserpdfs = filter => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_USERPDFS_REQUEST',
  });

  return api.fetchUserpdfs().then(
    (response) => {
      dispatch({
        type: 'FETCH_USERPDFS_SUCCESS',
        response,
      });
    },
    (error) => {
      dispatch({
        type: 'FETCH_USERPDFS_FAILURE',
        message: error.message || 'Something went wrong.',
      });
    },
  );
};

export const updateUserpdf = (id, currentpg, done) => (dispatch, getState) => {
  // Don't update if tour is going.
  if (!getState().tour.active) {
    dispatch({
      type: 'UPDATE_USERPDF_REQUEST',
      request: { currentpg, done }, // TODO: store this in state & drop duplicate requests
    });

    return api.updateUserpdf(id, currentpg, done).then((response) => {
      dispatch({
        type: 'UPDATE_USERPDF_SUCCESS',
        response,
      });
    });
  }
};

export const createGrant = grantData => (dispatch) => {
  dispatch({
    type: 'CREATE_GRANT_REQUEST',
  });

  return api.createGrant(grantData).then(
    (response) => {
      dispatch({
        type: 'CREATE_GRANT_SUCCESS',
        response,
      });
    },
    (error) => {
      dispatch({
        type: 'CREATE_GRANT_FAILURE',
        error,
      });
    },
  );
};

export const fetchCurrentUser = () => (dispatch) => {
  dispatch({
    type: 'FETCH_CURRENTUSER_REQUEST',
  });

  return api.fetchCurrentUser().then(
    (response) => {
      dispatch({
        type: 'FETCH_CURRENTUSER_SUCCESS',
        response,
      });
    },
    () => {
      dispatch({
        type: 'FETCH_CURRENTUSER_FAILURE',
      });
    },
  );
};

export const tourSetStep = step => (dispatch) => {
  if (step === 2) {
    // Go to our sample entry
    dispatch(push(`/${6}`));
  }

  return Promise.resolve(
    dispatch({
      type: 'TOUR_SET_STEP',
      step,
    }),
  );
};

export const tourStop = () => (dispatch, getState) => {
  dispatch({
    type: 'RESTORE_PRE_TOUR_STATE',
    oldState: getState().preTourState,
  });

  // Go back home
  dispatch(push('/'));

  return Promise.resolve(dispatch({ type: 'TOUR_STOP' }));
};

export const tourStart = () => (dispatch, getState) => {
  dispatch({
    type: 'SAVE_PRE_TOUR_STATE',
    state: getState(),
  });

  // Set up some fake state, for show.
  dispatch({
    type: 'FETCH_USERPDFS_SUCCESS',
    response: {
      6: {
        id: 6,
        org: {
          id: 35,
          name: "Auntie Na's House",
        },
        pdfurl:
          'https://data.detroitledger.org/sites/default/files/grantentrypdfs/382530980_201412_990.pdf',
        done: false,
        year: 2013,
        currentpg: 4,
      },
      7: {
        id: 7,
        org: {
          id: 3679,
          name: 'Men Who Dare, Inc',
        },
        pdfurl:
          'https://data.detroitledger.org/sites/default/files/grantentrypdfs/382530980_201412_990.pdf',
        done: false,
        year: 2016,
        currentpg: 0,
      },
    },
  });

  return Promise.resolve(dispatch({ type: 'TOUR_START' }));
};
