import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from '../actions';
import { getVisibleUserpdfs, getErrorMessage, getIsFetching } from '../reducers';
import DropdownUserpdfs from './DropdownUserpdfs';
import DoneUserpdf from './DoneUserpdf';
import FetchError from './FetchError';
import { withPdfs } from '../containers/WithPdfs';

class UserpdfSelector extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchUserpdfs } = this.props;
    fetchUserpdfs(filter);
  }

  makeToggleDoneHandler = (userpdf) => {
    const { updateUserpdf } = this.props;
    return {
      value: userpdf.done,
      requestChange(newValue) {
        updateUserpdf(userpdf.id, userpdf.currentpg, newValue);
      },
    };
  }

  render() {
    const { isFetching, errorMessage, userpdfs, userpdfId } = this.props;
    if (isFetching && !userpdfs.length) {
      return <p>Loading...</p>;
    }
    if (errorMessage && !userpdfs.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      );
    }
    if (!isFetching && userpdfs.length < 1) {
      return <p>No pdfs found.</p>;
    }

    const checkbox = userpdfId ? <DoneUserpdf toggleDoneHandler={this.makeToggleDoneHandler(userpdfs.find(function(p) {
            return p.id === parseInt(userpdfId, 10);
      })
    )} /> : <p></p>;

    return (
      <div>
        <DropdownUserpdfs
          userpdfs={userpdfs}
          dispatch={this.props.dispatch}
          userpdfId={userpdfId}
        />
        {checkbox}
      </div>
    );
  }
}

UserpdfSelector.propTypes = {
  filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  errorMessage: PropTypes.string,
  userpdfs: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchUserpdfs: PropTypes.func.isRequired,
  updateUserpdf: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  userpdfId: PropTypes.string,
};

const mapStateToProps = (state) => {
  const filter = 'all';

  return {
    isFetching: getIsFetching(state, filter),
    errorMessage: getErrorMessage(state, filter),
    userpdfs: getVisibleUserpdfs(state, filter),
    filter,
  };
};

let UserpdfSelectorWrapped = withRouter(connect(
  mapStateToProps,
  actions
)(UserpdfSelector));

UserpdfSelectorWrapped = withPdfs(UserpdfSelectorWrapped);

export default UserpdfSelectorWrapped;
