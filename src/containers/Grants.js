import React from 'react';

import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import Helmet from 'react-helmet';

import { Col, Row, Nav, NavItem } from 'react-bootstrap';

import { slugify, stripHtml, extractYear, dollarsFormatter } from '../utils';

import Page from '../components/Page';
import Flag from '../components/Flag';
import GrantTable from '../components/GrantTable';

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
      relatedTo(limit: 10) {
        uuid
        amount
        description
        dateTo
        dateFrom
        from {
          name
          uuid
        }
      }
      relatedFrom(limit: 10) {
        uuid
        amount
        description
        dateTo
        dateFrom
        to {
          name
          uuid
        }
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

  const { to, from, source, relatedTo, relatedFrom } = data.grant;
  const { dateFrom, dateTo, amount, description } = cleanse(data.grant);

  // static for now, handle state later
  const showGrantSide = 'received';

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
      <h2>Related grants</h2>
      <Nav bsStyle="tabs" activeKey={showGrantSide}>
        <NavItem eventKey="received">Grants from {from.name}</NavItem>
        <NavItem eventKey="funded">Grants to {to.name}</NavItem>
      </Nav>
      <GrantTable
        relatedGrants
        verb={showGrantSide}
        grants={showGrantSide === 'funded' ? relatedTo : relatedFrom}
        sums={
          showGrantSide === 'funded' ? to.totalReceived : from.totalFunded
        }
      />
    </Page>
  );
};

const cleanse = (grant) => {
  const dateFrom = extractYear(grant.dateFrom);
  const dateTo = extractYear(grant.dateTo);
  const desc = grant.description ? stripHtml(grant.description) : 'No description available';

  return {
    dateFrom,
    dateTo,
    description: desc,
    amount: dollarsFormatter.format(grant.amount),
  }
};
