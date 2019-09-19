import { ApolloProvider } from 'react-apollo';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import createApolloClient from './network/create-apollo-client';

import Home from './containers/Home';
import About from './containers/About';
import Editor from './editor/App';
import Organization from './containers/Organization';
import Search from './containers/Search';
import Methods from './containers/Methods';

import NavbarLink from './components/NavbarLink';
import Footer from './components/Footer';

import './styles/main.scss';

// XXX TODO
// const config = require('config');
// const API_URL = config.get('api_url');
const config = require('./settings');

const client = createApolloClient(config.api_url); // via webpack config

const initialState = window['__INITIAL_STATE__'];

const history = createHashHistory();

const store = configureStore(initialState, history);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <nav className="navbar navbar-inverse">
            <div className="container">
              <div className="navbar-header">
                <Link className="navbar-brand" to="/">
                  The Detroit Ledger
                </Link>
              </div>

              <ul className="nav navbar-nav">
                <NavbarLink title="About" href="/about" />
                <NavbarLink title="Data & Methods" href="/methods" />
                <NavbarLink title="Add Grants" href="/editor" />
              </ul>
            </div>
          </nav>
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/organizations/:name/:uuid" component={Organization} />
            <Route path="search" component={Search} />
            <Route path="/methods" component={Methods} />
            <Route path="/editor" component={Editor} />
          </div>
          <Footer />
        </div>
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);
