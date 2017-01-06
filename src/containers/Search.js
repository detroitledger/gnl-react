import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

/** TODO store ein search value as state, pass to query, return results - and learn more about compose */

class Search extends React.Component {
  
  constructor(args) {
    super(args);
  }

  handleChange(event) {
  	console.log({value: event.target.value});
  }

  render() {
    return (
        <div>
          <h3>Search organizations</h3>
          <input type='text' 
            placeholder='Search by EIN' 
            onChange = {this.handleChange} />
          <br />
          <h4>Results: </h4>
        </div>
    );
  }

}

Search.propTypes = {
  data: PropTypes.shape({
    irsOrganization: PropTypes.object,
  }).isRequired,
};

const EIN_QUERY = gql`
query getEIN($ein: String!) {
  irsOrganization(ein: $ein) {
    ein
  }
}
`;

export default compose(
  graphql(EIN_QUERY, {
    options: ({ params }) => ({
      variables: { ein: params.search_value },
    }),
    props({ data: { irsOrganization } }) {
      return { data: { irsOrganization } };
    },
  }),
)(Search);
