import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// Presentational component to display search result
const SearchResult = ({ loading, irsOrganization }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!irsOrganization) {
    return <em>Not found</em>;
  }
 
  // Iterate over all ledger orgs that match irs org ein and return their name(s)
  const orgName = irsOrganization.ledgerOrganizations.map(org =>
    <li key={org.id}>
      {org.name}
    </li>
  );

  return (
    <div>
      <p>EIN: {irsOrganization.ein}</p>
      <p>Filing type: {irsOrganization.filing_type}</p>
      <p>Tax period: {irsOrganization.tax_period}</p>
      <p>Ledger name(s): {orgName}</p>
    </div>
  );
};

SearchResult.propTypes = {
  loading: PropTypes.bool.isRequired,
  irsOrganization: PropTypes.object // Not required bc null until query is successfully run
};

// Graphql query using ein as search parameter on irs organizations
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
      tax_period,
      ledgerOrganizations {
        name,
        description
      }
    }
  }
`;

export default graphql(EIN_QUERY, {
  options: ({ ein }) => ({ 
    variables: { ein } 
  }),
  props: ({ data: { loading, irsOrganization } }) => ({
    loading, irsOrganization,
  }),
})(SearchResult);
