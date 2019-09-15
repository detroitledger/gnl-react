import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getVisibleUserpdfs, getHasPDFs, getIsFetching } from '../reducers';

const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

/**
  If you need the current pdfs on a component, you'd wrap it like so:
  withPdfs(<MyComponent />)
*/
export const withPdfs = WrappedComponent => {
  class Wrapper extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  Wrapper.propTypes = {
    dispatch: PropTypes.func.isRequired,
    haspdfs: PropTypes.bool,
    isFetching: PropTypes.bool.isRequired,
    userpdfId: PropTypes.string,
    userpdfs: PropTypes.array,
  };

  const mapStateToProps = (state, { match: { params } }) => {
    const userpdfId = params.userpdf || null;
    const userpdfs = getVisibleUserpdfs(state, 'all');

    return {
      isFetching: getIsFetching(state, 'all'),
      userpdfId,
      haspdfs: getHasPDFs(userpdfs, userpdfId),
      userpdfs,
    };
  };

  Wrapper.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;

  return withRouter(connect(mapStateToProps)(Wrapper));
};
