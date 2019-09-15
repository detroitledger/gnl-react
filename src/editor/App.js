import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.scss';

import * as actions from './actions';
import PdfviewerContainer from './components/PdfviewerContainer';
import Addgrantframe from './components/Addgrantframe';
import Topbar from './components/Topbar';
import Tour from './containers/Tour';

export class UnwrappedApp extends Component {
  componentDidMount() {
    this.fetchData();
  }

  static propTypes = {
    isFetchingUser: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    fetchUserpdfs: PropTypes.func.isRequired,
    fetchCurrentUser: PropTypes.func.isRequired,
  };

  fetchData() {
    const { fetchUserpdfs, fetchCurrentUser } = this.props;
    fetchCurrentUser();
    fetchUserpdfs('all');
  }

  loading = () => <div className="bigmessage">Loading...</div>;

  loginPrompt = () => (
    <a className="bigmessage" href="/user">
      Log in to start entering grants
    </a>
  );

  render() {
    if (this.props.isFetchingUser) return this.loading();
    if (!this.props.loggedIn) return this.loginPrompt();

    return (
      <div className="App">
        <Tour />
        <header className="Topbar-container">
          <Topbar />
        </header>
        <main className="wrapper">
          <div className="Pdfviewer-container" role="complementary">
            <PdfviewerContainer />
          </div>
          <div className="Addgrantframe-container" role="main">
            <Addgrantframe />
          </div>
        </main>
      </div>
    );
  }
}

export default connect(
  ({ editor: { user } }) => ({
    loggedIn: user.id !== null,
    isFetchingUser: user.isFetching,
  }),
  actions,
)(UnwrappedApp);
