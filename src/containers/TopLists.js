import React from 'react';
import _ from 'lodash';

import { useQuery, gql } from '@apollo/client';

import { Col, Row } from 'react-bootstrap';

import TopListsList from 'components/TopListsList';

// Graphql queries for top recipients and funders
const GET_TOP_RECIPIENTS = gql`
  query topRecipients {
    organizations(orderBy: totalReceived, orderByDirection: DESC, limit: 20) {
      name
      uuid
      totalReceived
      publicFunder
    }
  }
`;

const GET_TOP_FUNDERS = gql`
  query topFunders {
    organizations(orderBy: totalFunded, orderByDirection: DESC, limit: 20) {
      name
      uuid
      totalFunded
      publicFunder
    }
  }
`;

const TopLists = () => {
  const { data: recipients, error: errorR, loading: loadingR } = useQuery(
    GET_TOP_RECIPIENTS
  );
  const { data: funders, error: errorF, loading: loadingF } = useQuery(
    GET_TOP_FUNDERS
  );

  if (errorF || errorR) {
    return <p>Sorry, something went wrong!</p>;
  }

  if (loadingF || loadingR) {
    return <p>Loading top organizations...</p>;
  }

  let topRecipientsPublic = _.filter(
    recipients.organizations,
    (org) => org.publicFunder === true
  ).slice(0, 5);
  let topRecipientsPrivate = _.filter(
    recipients.organizations,
    (org) => org.publicFunder !== true
  ).slice(0, 5);

  let topFundersPublic = _.filter(
    funders.organizations,
    (org) => org.publicFunder === true
  ).slice(0, 5);
  let topFundersPrivate = _.filter(
    funders.organizations,
    (org) => org.publicFunder !== true
  ).slice(0, 5);

  return (
    <div className="toplists container">
      <Row>
        <Col md={12}>
          <h2>Top Funders</h2>
          <p className="size-medium font-weight-light">
            These organizations gave the most. Public funders are often
            government agencies, while private funders are often philanthropic
            organizations who file Form 990-PF.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h3>Public Funders</h3>
          <TopListsList
            organizations={topFundersPublic}
            direction="totalFunded"
          />
        </Col>
        <Col md={6}>
          <h3>Private Funders</h3>
          <TopListsList
            organizations={topFundersPrivate}
            direction="totalFunded"
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h2>Top Recipients</h2>
          <p className="size-medium font-weight-light">
            These organizations received the most. Public recipients are often
            government agencies and private recipients are often registered
            nonprofit organizations. Some recipients may be ranked highly
            because they act as "pass through" organizations for grants between
            the federal government or other endowments and local recipients.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h3>Public Recipients</h3>
          <TopListsList
            organizations={topRecipientsPublic}
            direction="totalReceived"
          />
        </Col>
        <Col md={6}>
          <h3>Private Recipients</h3>
          <TopListsList
            organizations={topRecipientsPrivate}
            direction="totalReceived"
          />
        </Col>
      </Row>
    </div>
  );
};

export default TopLists;
