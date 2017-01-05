import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from '../containers/Layout';
import Home from '../containers/Home';
import About from '../containers/About';

import privateRoute from './privateRoute';
import Login from '../containers/Login';
import fetchUser from '../actions/user';

export default function getRoutes(onLogout, store, client) {
  const logout = (nextState, replace, cb) => {
    onLogout();
    if (client) {
      client.resetStore();
    }
    replace('/');
    cb();
  };

  if (store) { // from client
    const token = localStorage.getItem('auth-token');
    if (token !== null) {
      store.dispatch(fetchUser());
    }
  }

  return (
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route name="About (secret ;) ;) )" path="about" component={privateRoute(About)} />
      <Route name="Login" path="login" component={Login} />
      <Route name="Logout" path="logout" onEnter={logout} />
    </Route>
  );
}
