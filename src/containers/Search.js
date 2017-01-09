import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

import SearchResult from './SearchResult.js';

// Parent component to render search input, store value as state and pass down to query/SearchResult component
class Search extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  	console.log(this.state);
  }

  render() {
    // const { loading, irsOrganization } = this.props.data;

    // if (loading) {
    //   return <p>Loading...</p>;
    // }

    return (
        <div>
          <h3>Search organizations</h3>
          <input type='text' 
            placeholder='Search by EIN' 
            onChange = {this.handleChange} />
          <br />
          <h4>Results: </h4>
          <SearchResult ein={this.state.value} />
        </div>
    );
  }
}

export default Search;
