import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from '../containers/Layout';
import Home from '../containers/Home';
import About from '../containers/About';
import Organizations from '../containers/Organizations';
import Organization from '../containers/Organization';

import privateRoute from './privateRoute';
import Login from '../containers/Login';
import fetchUser from '../actions/user';

export default function getRoutes(onLogout, store, client) {
  const hasWindow = typeof window !== 'undefined';

  const logout = (nextState, replace, cb) => {
    onLogout();
    if (client) {
      client.resetStore();
    }
    replace('/');
    cb();
  };

  if (store && hasWindow && typeof window.localStorage !== 'undefined') { // from client
    const token = localStorage.getItem('auth-token');
    if (token !== null) {
      store.dispatch(fetchUser());
    }
  }

  return (
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="about" component={privateRoute(About)} />
      <Route path="login" component={Login} />
      <Route path="logout" onEnter={logout} />
      <Route path="organizations">
        <IndexRoute component={Organizations} />
        <Route path=":organizationId" component={Organization} />
      </Route>
    </Route>
  );
}
