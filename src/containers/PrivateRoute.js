import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Admin from './Admin';

const PrivateRoute = ({ user, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (user ? <Component {...props} /> : <Admin />)}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
};

export default connect(({ auth }) => ({
  user: auth.user,
}))(PrivateRoute);
