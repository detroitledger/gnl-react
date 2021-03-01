import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Provider } from 'react-redux';

import { ApolloProvider } from '@apollo/react-hooks';

import configureStore from './store/configureStore';

import createApolloClient from './network/create-apollo-client';

import PrivateRoute from './containers/PrivateRoute';

import Home from './containers/Home';
import About from './containers/About';
import AddGrant from './containers/AddGrant';
import Admin from './containers/Admin';
import Grants from './containers/Grants';
import Organizations from './containers/Organizations';
import Search from './containers/Search';
import Methods from './containers/Methods';
import OrgNteeTags from './containers/OrgNteeTags';

import AdminLinks from './containers/AdminLinks';

import NavbarLink from './components/NavbarLink';
import Footer from './components/Footer';

import './styles/main.scss';

export const API_URL =
  process.env.REACT_APP_API_URL || 'https://gnl-graphql.herokuapp.com';
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
                <AdminLinks />
              </ul>
            </div>
          </nav>
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route path="/grants" component={Grants} />
            <Route path="/organizations" component={Organizations} />
            <Route path="/ntees" component={OrgNteeTags} />
            <Route path="/about" component={About} />
            <Route path="search" component={Search} />
            <Route path="/methods" component={Methods} />
            <Route exact path="/admin" component={Admin} />
            <PrivateRoute exact path="/admin/grants/add" component={AddGrant} />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
    ,
  </ApolloProvider>,
  document.getElementById('root')
);
