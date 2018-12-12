import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';

// Component to query and process search result
const SearchResult = ({ loading, organizations }) => {
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!organizations) {
    return <p><em>Name not found</em></p>;
  }

  // Iterate over all ledger orgs that match name
  const linkedOrgNames = organizations.map((org, i) =>
    <li key={i}>
      <Link to={'/organizations/' + org.uuid}>{org.name}</Link>
    </li>
  );

  return (
    <div>
      <h4>Ledger organizations</h4>
      <p>{linkedOrgNames}</p>
    </div>
  );

};

SearchResult.propTypes = {
  loading: PropTypes.bool.isRequired,
  irsOrganization: PropTypes.object // Not required bc null until query is successfully run
};

// Graphql query using name as search parameter on irs organizations
const NAME_QUERY = gql`
  query getOrganizationsByName($name: String!) {
    organizations(limit: 50, where: { name: { iLike: $name } }) {
      name,
      uuid,
    }
  }
`;

export default graphql(NAME_QUERY, {
  options: ({ name }) => ({
    variables: { name: `%${name}%` }
  }),
  props: ({ data: { loading, organizations } }) => ({
    loading,
    organizations,
  }),
})(SearchResult);
