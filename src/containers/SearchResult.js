import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { slugify } from '../utils';

// Graphql query using name as search parameter on irs organizations
const NAME_QUERY = gql`
  query getOrganizationsByName($name: String!) {
    organizations(limit: 10, nameLike: $name) {
      name
      uuid
    }
  }
`;

// Component to query and process search result
const SearchResult = ({ name }) => {
  const { loading, error, data } = useQuery(NAME_QUERY, {
    variables: { name: `%${name}%` },
  });

  if (error) {
    return <p>Sorry, something went wrong!</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data || !data.organizations) {
    return (
      <p>
        <em>Name not found</em>
      </p>
    );
  }

  // Iterate over all ledger orgs that match name
  const linkedOrgNames = data.organizations.map((org, i) => (
    <div key={i}>
      <Link to={`/organizations/${slugify(org.name)}/${org.uuid}`}>
        {org.name}
      </Link>
    </div>
  ));

  return <div>{linkedOrgNames}</div>;
};

SearchResult.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SearchResult;
