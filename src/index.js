import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import createApolloClient from './network/create-apollo-client';

import Home from './containers/Home';
import About from './containers/About';
import Organization from './containers/Organization';
import Search from './containers/Search';
import Methods from './containers/Methods';

import NavbarLink from './components/NavbarLink';
import Footer from './components/Footer';

import './styles/main.scss';

const client = createApolloClient();

let initialState = window['__INITIAL_STATE__'];

const store = configureStore(initialState);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <div>
          <nav className="navbar navbar-inverse">
            <div className="container">
              <div className="navbar-header">
                <Link className="navbar-brand" to="/">
                  The Detroit Ledger
                </Link>
              </div>

              <ul className="nav navbar-nav">
                <NavbarLink title="Home" href="/" />
                <NavbarLink title="About" href="/about" />
                <NavbarLink title="Data & Methods" href="/methods" />
                <NavbarLink title="Search" href="/search" />
              </ul>
            </div>
          </nav>
          <div className="container">
            <Route
              exact
              path="/"
              component={Home}
            />
            <Route
              path="/about"
              component={About}
            />
            <Route
              path="/organizations/:name/:uuid"
              component={Organization}
            />
            <Route
              path="search"
              component={Search}
            />
            <Route
              path="/methods"
              component={Methods}
            />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);
