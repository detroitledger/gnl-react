import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setError, dismissError } from '../actions/errors';

class Errors extends Component {
  render() {
    const { errors } = this.props;
    if (!errors.length) {
      return null;
    }
    return (
      <div className="errors">
        {errors.map((error, i) => (
          <p key={i}>
            {error}{' '}
            <button onClick={this.props.handleDismissError.bind(this, i)}>
              [x]
            </button>
          </p>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetError: (message) => {
      dispatch(setError(message));
    },
    handleDismissError: (id) => {
      dispatch(dismissError(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Errors);
