import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import jwtDecode from 'jwt-decode';

import { ApolloProvider } from 'react-apollo';

import configureStore from './store/configureStore';

import createApolloClient from './network/create-apollo-client';

import getRoutes from './routes';
import setupAxiosInterceptors from './middleware/axios';
import { redirectToLoginWithMessage, signOutUser } from './actions/auth';

import 'react-virtualized/styles.css';

import './styles/main.scss';

const client = createApolloClient();

let initialState = window['__INITIAL_STATE__'];

const token = localStorage.getItem('auth-token');
if (token) {
  try {
    const user = jwtDecode(token);
    initialState = {
      auth: { authenticated: true, token, logging: false },
      user: { user, loading: false },
    };
  } catch (ex) {
    console.error(ex);
  }
}

const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

const actions = bindActionCreators(
  {
    redirectToLoginWithMessage,
    signOutUser,
  },
  store.dispatch,
);

setupAxiosInterceptors(() => actions.redirectToLoginWithMessage());

const routes = getRoutes(actions.signOutUser, store, client);

ReactDOM.render(
  <ApolloProvider client={client} store={store}>
    <Router history={history} routes={routes} />
  </ApolloProvider>,
  document.getElementById('app'),
);
