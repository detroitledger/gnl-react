import React from 'react';
import PropTypes from 'prop-types';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Link } from 'react-router-dom';

import { slugify } from '../utils';

// Graphql query using name as search parameter on irs organizations
const NAME_QUERY = gql`
  query getOrganizationsByName($name: String!) {
    organizations(limit: 50, nameLike: $name) {
      name,
      uuid,
    }
  }
`;

// Component to query and process search result
export default ({ name }) => {
  const { loading, error, data } = useQuery(NAME_QUERY, {
    variables: { name: `%${name}%` }
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data || !data.organizations) {
    return <p><em>Name not found</em></p>;
  }

  // Iterate over all ledger orgs that match name
  const linkedOrgNames = data.organizations.map((org, i) =>
    <li key={i}>
      <Link to={`/organizations/${slugify(org.name)}/${org.uuid}`}>{org.name}</Link>
    </li>
  );

  return (
    <div>
      <h4>Ledger organizations</h4>
      <p>{linkedOrgNames}</p>
    </div>
  );
};
