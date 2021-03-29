import React from 'react';

import { uniq, map, filter, findIndex, sortBy } from 'lodash';

import { useQuery, gql } from '@apollo/client';

import { stripHtml, extractYear } from '../utils';

import GrantTable from '../components/GrantTable';

const GET_ORGANIZATION_GRANTS = gql`
  query getOrg($organizationId: String!, $grantsFundedOffset: Int, $grantsReceivedOffset: Int, $limit: Int) {
    organization(uuid: $organizationId) {
      grantsFunded (offset: $grantsFundedOffset, limit: $limit, orderBy: uuid) {
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
      grantsReceived (offset: $grantsReceivedOffset, limit: $limit, orderBy: uuid) {
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
    }
  }
`;

const GrantsTableWrapper = (props) => {
  const { loading, error, data, fetchMore } = useQuery(GET_ORGANIZATION_GRANTS, {
    variables: { 
      organizationId: props.organizationId,
      grantsFundedOffset: 0,
      grantsReceivedOffset: 0,
      limit: 100
    },
    notifyOnNetworkStatusChange: true,  // Update 'loading' prop after fetchMore
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error}`;

  if (!data.organization) return `Failed to load org data!`;

  const loadMoreGrantsFunded = data.organization.grantsFunded.length <  props.countGrantsFrom;
  const loadMoreGrantsReceived = data.organization.grantsReceived.length < props.countGrantsTo;

  // If our initial response is fewer records than the total grant count for either side,
  //   fetchMore records and merge the arrays using apollo's offset-based pagination
  if (loadMoreGrantsFunded || loadMoreGrantsReceived) {
    fetchMore({
      variables: {
        grantsFundedOffset: data.organization.grantsFunded.length,
        grantsReceivedOffset: data.organization.grantsReceived.length,
      },
    });
  }

  console.log(
    `Fetched ${data.organization.grantsFunded.length}/${props.countGrantsFrom} grants funded\
     and ${data.organization.grantsReceived.length}/${props.countGrantsTo} grants received.`
  );

  const {
    grantsFunded,
    grantsReceived,
    fundedYearlySums,
    receivedYearlySums,
  } = cleanse(data.organization);

  return (
    <GrantTable
      verb={props.showGrantSide}
      grants={props.showGrantSide === 'funded' ? grantsFunded : grantsReceived}
      sums={
        props.showGrantSide === 'funded' ? fundedYearlySums : receivedYearlySums
      }
    />
  );
};

const cleanse = (organization) => {
  // Sort lists by org
  const flattenedGrantsReceived = sortBy(
    organization.grantsReceived.map((grant) => {
      const dateFrom = extractYear(grant.dateFrom);
      const dateTo = extractYear(grant.dateTo);
      const years = `${dateFrom} - ${dateTo}`;
      const desc = grant.description ? stripHtml(grant.description) : 'No description available';

      return {
        org: grant.from.name,
        orgUuid: grant.from.uuid,
        description: desc,
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
      const dateFrom = extractYear(grant.dateFrom);
      const dateTo = extractYear(grant.dateTo);
      const years = `${dateFrom} - ${dateTo}`;
      const desc = grant.description ? stripHtml(grant.description) : 'No description available';

      return {
        org: grant.to.name,
        orgUuid: grant.to.uuid,
        description: desc,
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

  const { grants: grantsReceived, yearlySums: receivedYearlySums } = addSummaryRows(
    flattenedGrantsReceived
  );

  // Create a map containing a union of years in funded & received sums with zero values
  // This is used to ensure that the bar charts for funded/received have the same y axis
  // categories.
  const allYears = Object.keys({
    ...fundedYearlySums,
    ...receivedYearlySums,
  }).reduce((acc, cur) => ({ ...acc, [cur]: 0 }), {});

  return {
    grantsFunded,
    fundedYearlySums: { ...allYears, ...fundedYearlySums },
    grantsReceived,
    receivedYearlySums: { ...allYears, ...receivedYearlySums },
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
};

export default GrantsTableWrapper;
