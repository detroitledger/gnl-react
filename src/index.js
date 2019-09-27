import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Provider } from 'react-redux';

import { ApolloProvider } from '@apollo/react-hooks';

import configureStore from './store/configureStore';

import createApolloClient from './network/create-apollo-client';

import Home from './containers/Home';
import About from './containers/About';
import Admin from './containers/Admin';
//import Editor from './editor/App';
//import Organization from './containers/Organization';
import Search from './containers/Search';
import Methods from './containers/Methods';

import NavbarLink from './components/NavbarLink';
import Footer from './components/Footer';

import './styles/main.scss';

const API_URL = process.env.REACT_APP_API_URL || 'https://gnl-graphql.herokuapp.com';
const client = createApolloClient(API_URL);

const initialState = window['__INITIAL_STATE__'];

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
                <NavbarLink title="About" href="/about" />
                <NavbarLink title="Data & Methods" href="/methods" />
                <NavbarLink title="Admin" href="/admin" />
              </ul>
            </div>
          </nav>
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="search" component={Search} />
            <Route path="/methods" component={Methods} />
            <Route path="/admin" component={Admin} />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>,
  </ApolloProvider>,
  document.getElementById('root'),
);
