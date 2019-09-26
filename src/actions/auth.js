import store from 'store/dist/store.modern';

import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_SET_ID_TOKEN,
  AUTH_LOGOUT,
} from '../actions/types';

const authApiCall = async (path, id_token) => {
  const res = await fetch(process.env.REACT_APP_API_URL + '/' + path, {
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': id_token,
    },
  });

  const json = await res.json();

  return json;
};

let auth2session; // result of gapi.auth2.init
const { gapi } = window;

const getGoogleOAuth2Session = async () => {
  if (!auth2session) {
    await new Promise((resolve, reject) => {
      gapi.load('auth2', {
        callback: resolve,
        onerror: reject,
        ontimeout: reject,
        timeout: 10000,
      });
    });
    auth2session = await gapi.auth2.init({ client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID });
  }
  return auth2session;
};

const getNewGoogleOAuthToken = async () => {
  const auth = await getGoogleOAuth2Session();
  const { id_token } = await auth.currentUser.get().reloadAuthResponse();
  return id_token;
};

export const refreshGoogleOAuthToken = () => async (dispatch) => {
  const id_token = await getNewGoogleOAuthToken();
  dispatch({ type: AUTH_SET_ID_TOKEN, idToken: id_token });
  store.set('idToken', id_token);
  return id_token;
};

export const getUserWithSavedToken = () => async (dispatch) => {
  if (!store.get('idToken')) {
    try {
      const id_token = await getNewGoogleOAuthToken();
      dispatch({ type: AUTH_SET_ID_TOKEN, idToken: id_token });
      store.set('idToken', id_token);
    } catch (e) {
      if (e.idpId === 'google' && e.type === 'userLoggedOut') {
        console.log('welcome back ;) ;)');
      } else if (e.idpId === 'google' && e.type === 'noSessionBound') {
        console.warn('no session available', e);
      } else {
        console.error('strange error', e);
      }
    }
  }

  // Now we might have a token...
  if (store.get('idToken')) {
    dispatch({ type: AUTH_REQUEST });
    try {
      const id_token = store.get('idToken');
      const response = await authApiCall('getGoogleUser', id_token);
      if (response.user) {
        dispatch({ type: AUTH_SET_ID_TOKEN, idToken: id_token });
        dispatch({ type: AUTH_SUCCESS, response });
      } else if (response.error) {
        if (response.error.includes('Token expired')) {
          await refreshGoogleOAuthToken()(dispatch);
          await getUserWithSavedToken()(dispatch);
        } else {
          dispatch({ type: AUTH_FAILURE, response });
        }
      } else {
        dispatch({ type: AUTH_FAILURE, response: { error: 'Auth error: bad response from server' } });
      }
    } catch (e) {
      dispatch({ type: AUTH_FAILURE, response: { error: 'Auth error: error thrown by API client' } });
    }
  }
};

export const login = () => async (dispatch) => {
  dispatch({ type: AUTH_REQUEST });

  const auth = await getGoogleOAuth2Session();

  try {
    const user = await auth.signIn();
    const { id_token } = user.getAuthResponse(true);
    store.set('idToken', id_token);

    const response = await authApiCall('getGoogleUser', id_token);

    dispatch({ type: AUTH_SUCCESS, response });
  } catch (e) {
    dispatch({ type: AUTH_FAILURE, response: { error: 'enable popup windows please' } });
  }
};

export const logout = () => async (dispatch) => {
  const auth = await getGoogleOAuth2Session();

  try {
    await auth.signOut();
  } catch (e) {
    console.error('Error in Google OAuth2 signout', e);
  }

  try {
    store.remove('idToken');
  } catch (e) {
    console.error('Error in store.remove', e);
  }

  dispatch({ type: AUTH_LOGOUT });
};


export const callGoogleAuthEndpoint = (path) => async (dispatch, getState) => {
  const response = await authApiCall(path, getState().auth.idToken);
  if (response.error) {
    if (response.error.includes('Token expired')) {
      await refreshGoogleOAuthToken()(dispatch);
      return callGoogleAuthEndpoint(path)(dispatch);
    } else {
      // oops
      return response;
    }
  }
  return response;
}; 
