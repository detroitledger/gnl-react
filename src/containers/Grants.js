import React from 'react';

import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_GRANT = gql`
  query grant($grantId: String!) {
    grant(uuid: $grantId) {
      uuid
      dateFrom
      dateTo
      amount
      source
      description
      from {
        name
        uuid
      }
      to {
        name
        uuid
      }
    }
  }
`;

export default () => {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Grants</h2>
      <Switch>
        <Route path={`${match.path}/:grantId`}>
          <Grant />
        </Route>
        <Route path={match.path}>
          <h3>Please specify a grant.</h3>
        </Route>
      </Switch>
    </div>
  );
};

const Grant = () => {
  let { grantId } = useParams();

  const { loading, error, data } = useQuery(GET_GRANT, {
    variables: { grantId },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error}`;

  return (
    <div>
      <h3>Requested grant ID: {grantId}</h3>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
};
