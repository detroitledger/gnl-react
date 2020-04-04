import React, { useState } from 'react';

import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';

import { uniq, map, filter, findIndex, sortBy } from 'lodash';
import moment from 'moment';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import Helmet from 'react-helmet';

import { Col, Nav, NavItem, Row } from 'react-bootstrap';

import GrantTable from '../components/GrantTable';
import OrgFinances from '../components/OrgFinances';
import OrgNteeLinks from '../components/OrgNteeLinks';
import OrgNewsArticles from '../components/OrgNewsArticles';
import Page from '../components/Page';

const GET_ORGANIZATION = gql`
  query getOrg($organizationId: String!) {
    organization(uuid: $organizationId) {
      name
      description
      ein
      grantsFunded {
        uuid
        dateFrom
        dateTo
        to {
          name
          uuid
        }
        amount
        description
      }
      grantsReceived {
        uuid
        dateFrom
        dateTo
        from {
          name
          uuid
        }
        amount
        description
      }
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
    variables: { organizationId },
  });

  // Decide if we show grants funded or received
  // We default to funded if there are any
  const [grantSide, setGrantSide] = useState(false);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error}`;

  if (!data.organization) return `Oof!`;

  const { name, description, ein, nteeOrganizationTypes } = data.organization;

  const {
    grantsFunded,
    grantsReceived,
    fundedYearlySums,
    receivedYearlySums,
    forms990,
  } = cleanse(data.organization);

  const showGrantSide =
    grantSide ||
    (data.organization.grantsFunded.length > 0 ? 'funded' : 'received');

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

      <OrgNewsArticles newses={/*organization.ledgerNewsArticles*/ []} />
      {forms990 && <OrgFinances forms990={forms990} />}

      <h2>Grant Data</h2>
      <p>
        Describes grants Ledger staff have been able to document. Does not
        reflect a full, official record of all funding.
      </p>
      <Nav bsStyle="tabs" activeKey={showGrantSide} onSelect={setGrantSide}>
        <NavItem eventKey="funded">Grants funded</NavItem>
        <NavItem eventKey="received">Grants received</NavItem>
      </Nav>
      <GrantTable
        verb={showGrantSide}
        grants={showGrantSide == 'funded' ? grantsFunded : grantsReceived}
        sums={
          showGrantSide === 'funded' ? fundedYearlySums : receivedYearlySums
        }
      />
    </Page>
  );
};

const cleanse = (organization) => {
  // Sort lists by org
  const flattenedGrantsReceived = sortBy(
    organization.grantsReceived.map((grant) => {
      const dateFrom = moment(
        grant.dateFrom,
        'ddd, DD MMM YYYY HH:mm:ss ZZ'
      ).year();
      const dateTo = moment(
        grant.dateTo,
        'ddd, DD MMM YYYY HH:mm:ss ZZ'
      ).year();
      const years = `${dateFrom} - ${dateTo}`;

      return {
        org: grant.from.name,
        orgUuid: grant.from.uuid,
        description: grant.description || 'n/a',
        amount: grant.amount,
        uuid: grant.uuid,
        dateFrom,
        dateTo,
        years,
        summary: false,
      };
    }),
    (grant) =>
      // Sort by org id (boring) and then the inverse of the start year.
      grant.orgUuid + 1 / grant.dateFrom
  );

  const flattenedGrantsFunded = sortBy(
    organization.grantsFunded.map((grant) => {
      const dateFrom = moment(
        grant.dateFrom,
        'ddd, DD MMM YYYY HH:mm:ss ZZ'
      ).year();
      const dateTo = moment(
        grant.dateTo,
        'ddd, DD MMM YYYY HH:mm:ss ZZ'
      ).year();
      const years = `${dateFrom} - ${dateTo}`;

      return {
        org: grant.to.name,
        orgUuid: grant.to.uuid,
        description: grant.description || 'n/a',
        amount: grant.amount,
        uuid: grant.uuid,
        dateFrom,
        dateTo,
        years,
        summary: false,
      };
    }),
    (grant) =>
      // Sort by org id (boring) and then the inverse of the start year.
      grant.orgUuid + 1 / grant.dateFrom
  );

  const { grants: grantsFunded, yearlySums: fundedYearlySums } = addSummaryRows(
    flattenedGrantsFunded
  );
  const {
    grants: grantsReceived,
    yearlySums: receivedYearlySums,
  } = addSummaryRows(flattenedGrantsReceived);

  // Create a map containing a union of years in funded & received sums with zero values
  // This is used to ensure that the bar charts for funded/received have the same y axis
  // categories.
  const allYears = Object.keys({
    ...fundedYearlySums,
    ...receivedYearlySums,
  }).reduce((acc, cur) => ({ ...acc, [cur]: 0 }), {});

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
    grantsFunded,
    fundedYearlySums: { ...allYears, ...fundedYearlySums },
    grantsReceived,
    receivedYearlySums: { ...allYears, ...receivedYearlySums },
    forms990,
  };
};

/**
 * Add summary rows to table data,
 * and provide yearly totals.
 */
function addSummaryRows(grantsOrig) {
  // Copy the provided array.
  const grants = grantsOrig;

  // Get orgs
  const uniqOrgs = uniq(map(grants, 'orgUuid'));

  // Get stats per org, and stick em right in the array of grants as summary rows!
  const yearlySums = {};
  let insertAt = 0;
  uniqOrgs.forEach((orgUuid) => {
    let org = '';

    const sum = filter(grants, { orgUuid }).reduce((memo, grant) => {
      // along the way, build our yearly sums!
      if (yearlySums[grant.dateFrom] > 0) {
        yearlySums[grant.dateFrom] += grant.amount;
      } else {
        yearlySums[grant.dateFrom] = grant.amount;
      }

      // This'll happen over and over but that is just fine. We just want the right name.
      org = grant.org;

      return memo + grant.amount;
    }, 0);

    // Find first row of this org's grant
    insertAt = findIndex(grants, { orgUuid }, insertAt);

    // Splice in their stats row there
    // Add 1 to search index since we inserted another row
    grants.splice(insertAt, 0, {
      org,
      description: `${org}:`,
      orgUuid,
      amount: sum,
      uuid: `summaryrow-${orgUuid}`,
      start: null,
      end: null,
      summary: true,
    });
  });

  return { grants, yearlySums };
}
