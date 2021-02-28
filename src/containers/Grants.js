import React, { useState } from 'react';

import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import Helmet from 'react-helmet';

import { Col, Row, Nav, NavItem } from 'react-bootstrap';

import { uniq, map, filter, findIndex, sortBy } from 'lodash';

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
      relatedTo {
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
      relatedFrom {
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

  const [grantRelation, setGrantRelation] = useState(false);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error}`;

  if (!data.grant) return `Failed to load grant data!`;

  const { to, from, source, relatedTo, relatedFrom } = data.grant;
  const { dateFrom, dateTo, amount, description } = cleanse(data.grant);
  
  const flattenedRelatedTo = flattenRelatedGrants(relatedTo, 'to');
  const flattenedRelatedFrom = flattenRelatedGrants(relatedFrom, 'from');

  const showGrantsRelated =
    grantRelation ||
    (flattenedRelatedTo > 0 ? 'recieved' : 'funded');

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
      <Nav bsStyle="tabs" activeKey={showGrantsRelated} onSelect={setGrantRelation}>
        <NavItem eventKey="funded">From {from.name}</NavItem>
        <NavItem eventKey="received">To {to.name}</NavItem>
      </Nav>
      <GrantTable
        relatedGrants
        verb={showGrantsRelated}
        grants={showGrantsRelated === 'received' ? flattenedRelatedTo : flattenedRelatedFrom}
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

const flattenRelatedGrants = (relatedGrants, direction) => {
  const flattenedRelatedGrants = sortBy(
    relatedGrants.map((grant) => {
      const dateFrom = extractYear(grant.dateFrom);
      const dateTo = extractYear(grant.dateTo);
      const years = `${dateFrom} - ${dateTo}`;
      const desc = grant.description ? stripHtml(grant.description) : 'No description available';

      return {
        org: direction === 'to' ? grant.from.name : grant.to.name,
        orgUuid: direction === 'to' ? grant.from.uuid : grant.to.uuid,
        description: desc,
        amount: grant.amount,
        uuid: grant.uuid,
        dateFrom,
        dateTo,
        years,
        summary: false
      }
    }),
    (grant) =>
      // Sort by org id (boring) and then the inverse of the start year.
      grant.orgUuid + 1 / grant.dateFrom
  );

  return addSummaryRows(flattenedRelatedGrants);
};

// For related grants we only care about inserting the summary rows into grants, not YearlySums
function addSummaryRows(grantsOrig) {
  const grants = grantsOrig;
  const uniqOrgs = uniq(map(grants, 'orgUuid'));

  // Get stats per org, and stick em right in the array of grants as summary rows!
  let insertAt = 0;
  uniqOrgs.forEach((orgUuid) => {
    let org = '';

    const sum = filter(grants, { orgUuid }).reduce((memo, grant) => {
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
      orgUuid,
      description: `${org}: Summary`,
      amount: sum,
      uuid: `summaryrow-${orgUuid}`,
      start: null,
      end: null,
      summary: true,
    });
  });

  return grants;
}
