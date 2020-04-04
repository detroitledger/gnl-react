import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import * as authActions from '../actions/auth';

export class Admin extends Component {
  componentDidMount() {
    this.props.getUserWithSavedToken();
  }

  static propTypes = {
    gooUser: PropTypes.object,
    errorAuth: PropTypes.string,
    isFetchingAuth: PropTypes.bool,
    getUserWithSavedToken: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    callGoogleAuthEndpoint: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
  };

  authInProgress = () => (
    <div>
      <button className="bigmessage">Authenticating...</button>
    </div>
  );

  loginPrompt = () => (
    <div>
      <button className="bigmessage" onClick={this.props.login}>
        Log in to start
        {this.props.errorAuth && <div>Auth error: {this.props.errorAuth}</div>}
      </button>
    </div>
  );

  render() {
    console.log('re-rendering Admin');
    if (this.props.isFetchingAuth) return this.authInProgress();

    if (!this.props.gooUser) {
      return this.loginPrompt();
    }

    return (
      <div className="App">
        <button onClick={this.props.logout}>Log out</button>
        <div>gooUser: {JSON.stringify(this.props.gooUser)}</div>
        <button
          onClick={this.props.callGoogleAuthEndpoint.bind(
            this,
            'getGoogleUser'
          )}
        >
          getGoogleUser
        </button>
      </div>
    );
  }
}

export default connect(
  ({ auth }) => ({
    errorAuth: auth.error,
    isFetchingAuth: auth.isFetching,
    gooUser: auth.user,
  }),
  authActions
)(Admin);
