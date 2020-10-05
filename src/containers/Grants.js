import React from 'react';

import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import Helmet from 'react-helmet';

import { Col, Row } from 'react-bootstrap';

import moment from 'moment';

import { slugify } from '../utils';

import Page from '../components/Page';
import Flag from '../components/Flag';

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
        countGrantsFrom
        totalFunded
      }
      to {
        name
        uuid
        countGrantsTo
        totalReceived
      }
    }
  }
`;

export default () => {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Grant</h2>
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

  if (!data.grant) return `Failed to load grant data!`;

  const { to, from, source } = data.grant;
  const { dateFrom, dateTo, amount, description } = cleanse(data.grant);

  return (
    <Page>
      <Helmet title={`Grant from ${from.name} to ${to.name}`} />
      <h1>{amount}</h1>

      <Row>
        <Col md={6}>
          From
          <h2>
            <a href={`/organizations/${slugify(from.name)}/${from.uuid}`}>{from.name}</a>
          </h2>
        </Col>
        <Col md={6}>
          To 
          <h2>
            <a href={`/organizations/${slugify(to.name)}/${to.uuid}`}>{to.name}</a>
          </h2>
        </Col>
      </Row>
      <p>From {dateFrom} to {dateTo}</p>

      <p>{description}</p>
      <p>Source {source}</p>
      <Flag />

      <p>**related grants table tbd**</p>
    </Page>
  );
};

const cleanse = (grant) => {
  const dateFrom = moment(
    grant.dateFrom,
    'ddd, DD MMM YYYY HH:mm:ss ZZ'
  ).year();

  const dateTo = moment(
    grant.dateTo,
    'ddd, DD MMM YYYY HH:mm:ss ZZ'
  ).year();

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  const desc = grant.description ? grant.description.replace(/<[^>]*>?/gm, '') : 'No description available';

  return {
    dateFrom, 
    dateTo,
    description: desc,
    amount: formatter.format(parseInt(grant.amount, 10)),
  }
};
