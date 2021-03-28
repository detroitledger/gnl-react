import React from 'react';

import { useQuery, gql } from '@apollo/client';
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
    return <p className="center">Sorry, something went wrong!</p>;
  }

  if (loading) {
    return <p className="center">Loading...</p>;
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
    <h2 className="result" key={i}>
      <Link to={`/organizations/${slugify(org.name)}/${org.uuid}`}>
        {org.name}
      </Link>
    </h2>
  ));

  return <div className="search-results">{linkedOrgNames}</div>;
};

SearchResult.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SearchResult;
