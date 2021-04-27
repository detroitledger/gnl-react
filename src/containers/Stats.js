import React from 'react';
import numeral from 'numeral';

import { useQuery, gql } from '@apollo/client';

import { dollarsFormatter } from '../utils';

// Graphql query using name as search parameter on irs organizations
const GET_STATS = gql`
  query stats {
    stats {
      totalNumOrgs
      totalNumGrants
      totalGrantsDollars
    }
  }
`;

// Component to query and process search result
const Stats = ({ name }) => {
  const { loading, error, data } = useQuery(GET_STATS);

  if (error) {
    return <p>Sorry, something went wrong!</p>;
  }

  if (loading) {
    return <p>Loading stats...</p>;
  }

  const { totalNumOrgs, totalNumGrants, totalGrantsDollars } = data.stats;

  return (
    <h2>
      Search <strong>{numeral(totalNumOrgs).format('0,0')}</strong>{' '}
      organizations and <strong>{numeral(totalNumGrants).format('0,0')}</strong>{' '}
      grants covering{' '}
      <strong>{dollarsFormatter.format(totalGrantsDollars)}</strong> in Detroit.
    </h2>
  );
};

export default Stats;
