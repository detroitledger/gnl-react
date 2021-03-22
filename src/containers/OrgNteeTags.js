import React from 'react';

import { Link, Switch, Route, useRouteMatch, useParams } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';

import Helmet from 'react-helmet';

import Page from '../components/Page';

import { dollarsFormatter, slugify } from '../utils';

const GET_ORG_NTEE_TAG = gql`
  query getNteeOrganizationTypes($nteeUuid: String!) {
    nteeOrganizationTypes(uuid: $nteeUuid) {
      name
      code
      description
      totalFunded
      totalReceived
      organizations(limit: 100, orderBy: name) {
        uuid
        name
        totalFunded
        totalReceived
      }
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
          <li>Funded {dollarsFormatter.format(ntee.totalFunded)}</li>
          <li>Received {dollarsFormatter.format(ntee.totalReceived)}</li>
        </ul>
      </div>
      <div>
        <h2>{ntee.name} organizations:</h2>
        <table className="grantsTable">
          <thead>
            <tr>
              <th>Name</th>
              <th className="dates">Funded</th>
              <th>Received</th>
            </tr>
          </thead>
          <tbody>
            {ntee.organizations &&
              ntee.organizations.map((org, i) => (
                <tr key={i}>
                  <td>
                    <Link to={`/organizations/${slugify(org.name)}/${org.uuid}`}>
                      {org.name}
                    </Link>
                  </td>
                  <td>{org.totalFunded ? dollarsFormatter.format(org.totalFunded) : ''}</td>
                  <td>{org.totalReceived ? dollarsFormatter.format(org.totalReceived) : ''}</td>
                </tr>
              ))}
          </tbody>
      </table>
      </div>
    </Page>
  );
};
