import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

// Child component to display query results
class SearchResult extends React.Component {
  render() {
    const { loading, irsOrganization } = this.props.data;

    if (this.props.data.loading) {
      return <div>Loading...</div>;
    } else {
      // Find Ledger org name(s) that match EIN search value
      const orgName = irsOrganization.ledgerOrganizations.map(org =>
        <h1>{org.name}</h1>
      );
    }

    return(
      <div>
        {orgName}
      </div>
    );
  }
}

SearchResult.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    irsOrganization: PropTypes.object,
  }).isRequired,
};

// Define graphql query with ein search parameter
const EIN_QUERY = gql`
query getIrsOrgByEIN($ein: String!) {
  irsOrganization(ein: $ein) {
    ein,
    id,
    subsccd,
    filing_type,
    start_year,
    end_year,
    irs_year,
    filing_date,
    tax_period
  },
  ledgerOrganizations {
    name, 
    description
  }
}
`;

// Run query and set ein as props on SearchResult wrapper component
export default compose(
  graphql(EIN_QUERY, {
    options: ({ ein }) => ({
      variables: { ein },
    }),
    props({ data: { loading, irsOrganization } }) {
      return { data: { loading, irsOrganization } };
    },
  }),
)(SearchResult);
