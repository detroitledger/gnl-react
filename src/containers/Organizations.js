import React, { useState } from 'react';

import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';

import moment from 'moment';

import { useQuery, gql } from '@apollo/client';

import Helmet from 'react-helmet';

import { Col, Nav, NavItem, Row } from 'react-bootstrap';

import { dollarsFormatter } from '../utils';

import GrantsTableWrapper from './GrantsTableWrapper';

import OrgFinances from '../components/OrgFinances';
import OrgNteeLinks from '../components/OrgNteeLinks';
import OrgNewsArticles from '../components/OrgNewsArticles';
import Page from '../components/Page';
import Flag from '../components/Flag';

const GET_ORGANIZATION = gql`
  query getOrg($organizationId: String!) {
    organization(uuid: $organizationId) {
      name
      description
      ein
      totalFunded
      totalReceived
      countGrantsFrom
      countGrantsTo
      forms990 {
        id
        tax_period
        total_assets
        total_expenses
        total_liabilities
        grants_paid
        total_revenue
      }
      nteeOrganizationTypes {
        uuid
        name
      }
      news {
        uuid
        title
        date
        description
        link
      }
    }
  }
`;

export default () => {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Organizations</h2>
      <Switch>
        <Route path={`${match.path}/:slug/:organizationId`}>
          <Organization />
        </Route>
        <Route path={match.path}>
          <h3>Please specify a organization.</h3>
        </Route>
      </Switch>
    </div>
  );
};

const EIN = ({ ein }) => {
  if (!ein) return null;
  return <div className="ein">EIN: {ein}</div>;
};

const Organization = () => {
  let { organizationId } = useParams();

  const { loading, error, data } = useQuery(GET_ORGANIZATION, {
    variables: {
      organizationId: organizationId,
    },
  });

  // Decide if we show grants funded or received, default to funded if there are any
  const [grantSide, setGrantSide] = useState(false);

  // Show up to 4 news articles by default
  const defaultNewsLimit = 4;
  const [newsLimit, setNewsLimit] = useState(defaultNewsLimit);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error}`;

  if (!data.organization) return `Failed to load org data!`;

  const {
    name,
    description,
    ein,
    nteeOrganizationTypes,
    news,
  } = data.organization;

  const { forms990 } = cleanse(data.organization);

  const showGrantSide =
    grantSide ||
    (data.organization.countGrantsFrom > 0 ? 'funded' : 'received');

  return (
    <Page>
      <Helmet title={name} />
      <h1>{name}</h1>
      <p>{description}</p>

      <Row>
        <Col md={10}>
          <OrgNteeLinks ntees={nteeOrganizationTypes} />
        </Col>
        <Col md={2} className="eins">
          <EIN ein={ein} />
        </Col>
      </Row>

      {news && <OrgNewsArticles newses={news} limit={newsLimit} />}
      {news.length > defaultNewsLimit ? (
        <button
          onClick={(news) =>
            setNewsLimit(
              newsLimit === defaultNewsLimit ? news.length : defaultNewsLimit
            )
          }
        >
          {newsLimit === defaultNewsLimit ? `Show more news` : `Show less news`}
        </button>
      ) : (
        ``
      )}

      {forms990 && <OrgFinances forms990={forms990} />}

      <h2>Grant Data</h2>
      <p>
        Describes grants Ledger staff have been able to document. Does not
        reflect a full, official record of all funding.
      </p>
      <Flag />
      <Nav bsStyle="tabs" activeKey={showGrantSide} onSelect={setGrantSide}>
        <NavItem eventKey="funded">
          Gave {dollarsFormatter.format(data.organization.totalFunded) || `$0`}
        </NavItem>
        <NavItem eventKey="received">
          Received{' '}
          {dollarsFormatter.format(data.organization.totalReceived) || `$0`}
        </NavItem>
      </Nav>
      <GrantsTableWrapper
        showGrantSide={showGrantSide}
        organizationId={organizationId}
        countGrantsFrom={data.organization.countGrantsFrom}
        countGrantsTo={data.organization.countGrantsTo}
      />
    </Page>
  );
};

const cleanse = (organization) => {
  // Augment IRS data
  const forms990 =
    organization.forms990 &&
    organization.forms990.map((form990) => ({
      ...form990,
      year: Number(form990.tax_period.substring(0, 4)),
      month: Number(form990.tax_period.substring(4)),
      monthText: moment.months()[Number(form990.tax_period.substring(4) - 1)],
    }));

  return {
    forms990,
  };
};
