import React from 'react';
import Helmet from 'react-helmet';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import numeral from 'numeral';

import { slugify } from '../utils';

import Page from '../components/Page';
import Search from './Search';

// Graphql query using name as search parameter on irs organizations
const GET_STATS = gql`
  query stats {
    totals: stats {
      totalNumOrgs
      totalNumGrants
      totalGrantsDollars
    }

    mostConnectedRecipients: organizations(
      limit: 5
      orderBy: countDistinctFunders
      orderByDirection: DESC
    ) {
      name
      uuid
    }

    mostConnectedFunders: organizations(
      limit: 5
      orderBy: countDistinctRecipients
      orderByDirection: DESC
    ) {
      name
      uuid
    }

    topFunders: organizations(
      limit: 5
      orderBy: totalFunded
      orderByDirection: DESC
    ) {
      name
      uuid
      totalFunded
    }

    topRecipients: organizations(
      limit: 5
      orderBy: totalReceived
      orderByDirection: DESC
    ) {
      name
      uuid
      totalReceived
    }
  }
`;

export default function Index() {
  const { loading, error, data } = useQuery(GET_STATS);

  if (error) {
    return <p>Sorry, something went wrong!</p>;
  }

  if (loading) {
    return <p>Loading stats...</p>;
  }

  return (
    <section>
      <Page>
        <Helmet title="Homepage" />
        <h1>The Detroit Ledger</h1>
        <h2>
          Search{' '}
          <strong>{numeral(data.totals.totalNumOrgs).format('0,0')}</strong>{' '}
          organizations and{' '}
          <strong>{numeral(data.totals.totalNumGrants).format('0,0')}</strong>{' '}
          grants covering{' '}
          <strong>
            {numeral(data.totals.totalGrantsDollars).format('$0,0[.]00')}
          </strong>{' '}
          in Detroit.
        </h2>
        <Search />
        <h2>Top funders</h2>
        <p>These funders gave the most:</p>
        <ol>
          {data.topFunders.map((funder) => (
            <li key={funder.uuid}>
              <Link to={`/organizations/${slugify(funder.name)}/${funder.uuid}`}>
                {funder.name}
              </Link>{' '}
              ({numeral(funder.totalFunded).format('$0,0[.]00')})
            </li>
          ))}
        </ol>
        <h2>Top recipients</h2>
        <p>These recipients received the most:</p>
        <ol>
          {data.topRecipients.map((recipient) => (
            <li key={recipient.uuid}>
              <Link
                to={`/organizations/${slugify(recipient.name)}/${recipient.uuid}`}
              >
                {recipient.name}
              </Link>{' '}
              ({numeral(recipient.totalReceived).format('$0,0[.]00')})
            </li>
          ))}
        </ol>
        <h2>Most connected funders</h2>
        <p>
          In the network of philanthropy, the most connected funders are
          foundations that reach out to the most organizations. These are often
          the funders who also have the highest number of individual grants each
          year — but not necessarily the most money granted. In contrast, the
          least connected funders funnel their funds to a small set of
          organizations, often the same ones year after year.
        </p>
        <ol>
          {data.mostConnectedFunders.map((funder) => (
            <li key={funder.uuid}>
              <Link to={`/organizations/${slugify(funder.name)}/${funder.uuid}`}>
                {funder.name}
              </Link>
            </li>
          ))}
        </ol>
        <h2>Most connected recipients</h2>
        <p>
          The most connected recipients receive grants from the most unique
          funders. These aren't necessarily organizations that receive the most
          money, but are organizations that receive support from a variety of
          different foundations.
        </p>
        <ol>
          {data.mostConnectedRecipients.map((recipient) => (
            <li key={recipient.uuid}>
              <Link
                to={`/organizations/${slugify(recipient.name)}/${recipient.uuid}`}
              >
                {recipient.name}
              </Link>
            </li>
          ))}
        </ol>
      </Page>
    </section>
  );
}
