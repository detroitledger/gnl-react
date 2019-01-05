import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Helmet from 'react-helmet';
import { Col, Nav, NavItem, Row} from 'react-bootstrap';
import moment from 'moment';
import { uniq, map, filter, findIndex, sortBy } from 'lodash';

import { setGrantSide } from '../actions/ui';

import GrantTable from '../components/GrantTable';
import OrgFinances from '../components/OrgFinances';
import OrgNteeLinks from '../components/OrgNteeLinks';
import OrgNewsArticles from '../components/OrgNewsArticles';
import Page from '../components/Page';


const EIN = ({ein}) => {
  if (!ein) return null;
  return (<div className="ein">EIN: {ein}</div>)
}

const Organization = (props) => {
  const {
    error,
    loading,
    organization,
    grantsFunded,
    grantsReceived,
    fundedYearlySums,
    receivedYearlySums,
  } = props.data;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <h1>Sorry, we couldn't load this organization</h1>;
  }

  // Decide if we show grants funded or received
  // We default to funded if there are any
  let grantSide = props.grantSide;
  if (grantSide === 'none') {
    if (grantsFunded && grantsFunded.length > 0) {
      grantSide = 'funded'
    } else {
      grantSide = 'received'
    }
  }


  return (
    <Page>
      <Helmet title={organization.name} />
      <h1>{organization.name}</h1>
      <p>{organization.description}</p>

      <Row>
        <Col md={10}>
          <OrgNteeLinks ntees={organization.nteeOrganizationTypes} />
        </Col>
        <Col md={2} className="eins"><EIN ein={organization.ein} /></Col>
      </Row>

      <OrgNewsArticles newses={/*organization.ledgerNewsArticles*/[]} />
      <OrgFinances forms990={props.data.forms990} />

      <h2>Grant Data</h2>
      <p>
        Describes grants Ledger staff have been able to document. Does not reflect a full,
        official record of all funding.
      </p>
      <Nav
        bsStyle="tabs"
        activeKey={grantSide}
        onSelect={props.handleSetGrantSide}
      >
        <NavItem eventKey="funded">Grants funded</NavItem>
        <NavItem eventKey="received">Grants received</NavItem>
      </Nav>
      <GrantTable
        verb={grantSide}
        grantsReceived={grantsReceived}
        grantsFunded={grantsFunded}
        fundedYearlySums={fundedYearlySums}
        receivedYearlySums={receivedYearlySums}
      />
    </Page>
  );
}

Organization.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    organization: PropTypes.object,
    grantSide: PropTypes.string,
  }).isRequired,
};

const ORG_QUERY = gql`
  query getOrg($uuid: String!) {
    organization(uuid: $uuid) {
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

const mapStateToProps = (state) => {
  return {
    grantSide: state.ui.grantSide,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetGrantSide: (side) => {
      dispatch(setGrantSide(side));
    },
  };
};

export default compose(
  graphql(ORG_QUERY, {
    options: ({ match }) => ({
      variables: { uuid: match.params.uuid },
    }),
    props({ data: { error, loading, organization } }) {
      if (loading) {
        return { data: { loading: true } };
      }
      if (error) {
        console.error(error);
        return { data: { error: true, loading: false } };
      }

      // Sort lists by org
      const flattenedGrantsReceived = sortBy(
        organization.grantsReceived.map((grant) => {
          const dateFrom = moment(grant.dateFrom, 'ddd, DD MMM YYYY HH:mm:ss ZZ').year();
          const dateTo = moment(grant.dateTo, 'ddd, DD MMM YYYY HH:mm:ss ZZ').year();
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
        grant =>
          // Sort by org id (boring) and then the inverse of the start year.
          grant.orgUuid + 1 / grant.dateFrom,
      );

      const flattenedGrantsFunded = sortBy(
        organization.grantsFunded.map((grant) => {
          const dateFrom = moment(grant.dateFrom, 'ddd, DD MMM YYYY HH:mm:ss ZZ').year();
          const dateTo = moment(grant.dateTo, 'ddd, DD MMM YYYY HH:mm:ss ZZ').year();
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
        grant =>
          // Sort by org id (boring) and then the inverse of the start year.
          grant.orgUuid + 1 / grant.dateFrom,
      );

      const { grants: grantsFunded, yearlySums: fundedYearlySums } = addSummaryRows(
        flattenedGrantsFunded,
      );
      const { grants: grantsReceived, yearlySums: receivedYearlySums } = addSummaryRows(
        flattenedGrantsReceived,
      );

      // Create a map containing a union of years in funded & received sums with zero values
      // This is used to ensure that the bar charts for funded/received have the same y axis
      // categories.
      const allYears = Object
        .keys({ ...fundedYearlySums, ...receivedYearlySums })
        .reduce((acc, cur) => ({ ...acc, [cur]: 0 }), {});

      // Augment IRS data
      const forms990 = organization.forms990.map(form990 => ({
        ...form990,
        year: Number(form990.tax_period.substring(0, 4)),
        month: Number(form990.tax_period.substring(4)),
        monthText: moment.months()[Number(form990.tax_period.substring(4) - 1)],
      }));

      return {
        data: {
          loading,
          organization,
          grantsFunded,
          fundedYearlySums: { ...allYears, ...fundedYearlySums },
          grantsReceived,
          receivedYearlySums: { ...allYears, ...receivedYearlySums },
          forms990,
        },
      };
    },
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Organization);

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
