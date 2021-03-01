import React from 'react';

import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import Helmet from 'react-helmet';

import Page from '../components/Page';

import { dollarsFormatter } from '../utils';

const GET_ORG_NTEE_TAG = gql`
  query getNteeOrganizationTypes($nteeUuid: String!) {
    nteeOrganizationTypes(uuid: $nteeUuid) {
      name
      code
      description
      totalFunded
      totalReceived
    }
  }
`;

export default () => {
  let match = useRouteMatch();

  return (
    <div>
      <h2>National Taxonomy of Exempt Entities (NTEE)</h2>
      <Switch>
        <Route path={`${match.path}/:nteeUuid`}>
          <OrgNteeTag />
        </Route>
        <Route path={match.path}>
          <h3>Please specify an NTEE tag.</h3>
        </Route>
      </Switch>
    </div>
  );
};

const OrgNteeTag = () => {
  let { nteeUuid } = useParams();

  const { loading, error, data } = useQuery(GET_ORG_NTEE_TAG, {
    variables: { nteeUuid },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error}`;

  let ntee = data.nteeOrganizationTypes[0];

  return (
    <Page>
      <Helmet title={`NTEE: ${ntee.name}`} />
      <div className="ntee container">
        <h1>{ntee.name} ({ntee.code})</h1>
        <p className="size-medium font-weight-light">
          Based on our grants, organizations in this category have:
        </p>
        <ul className="size-medium font-weight-light">
          <li>Received {dollarsFormatter.format(ntee.totalReceived)}</li>
          <li>Funded {dollarsFormatter.format(ntee.totalFunded)}</li>
        </ul>
      </div>
    </Page>
  );
};
