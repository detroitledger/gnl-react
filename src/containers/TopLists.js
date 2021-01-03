import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { dollarsFormatter } from '../utils';


// Graphql queries for top recipients and funders
const GET_TOP_RECIPIENTS = gql`
  query topRecipients {
    organizations(orderBy: totalReceived, orderByDirection: DESC, limit: 5) {
      name
      totalReceived
    }
  }
`;

 const GET_TOP_FUNDERS = gql`
 query topFunders {
    organizations(orderBy: totalFunded, orderByDirection: DESC, limit: 5) {
      name
      totalFunded
    }
  }
 `;


const TopLists = () => {
  const { data: dataR, error: errorR, loading: loadingR } = useQuery(GET_TOP_RECIPIENTS);
  const { data, error, loading } = useQuery(GET_TOP_FUNDERS);

  if (error || errorR) {
    return <p>Sorry, something went wrong!</p>;
  }

  if (loading || loadingR) {
    return <p>Loading stats...</p>;
  }

  let topRecipients = dataR.organizations;
  let topFunders = data.organizations;

  return (
    <div sytle={{ dispay: 'flex', flexDirection: 'row' }}>
      <div>
        <h3>Top Recipients</h3>
        <span>These organizations received the most:</span>
        <ol>
            {topRecipients.map((r, i) => (
                <li key={i}>{r.name} ({dollarsFormatter.format(r.totalReceived)})</li>
            ))}
        </ol>
      </div>
      <div>
        <h3>Top Funders</h3>
        <span>These organizations gave the most:</span>
        <ol>
            {topFunders.map((r, i) => (
                <li key={i}>{r.name} ({dollarsFormatter.format(r.totalFunded)})</li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default TopLists;
