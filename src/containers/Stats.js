import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import numeral from 'numeral';

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
      <strong>{numeral(totalGrantsDollars).format('$0,0[.]00')}</strong> in
      Detroit.
    </h2>
  );
};

export default Stats;
