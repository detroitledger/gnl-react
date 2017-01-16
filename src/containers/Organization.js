import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';
import Helmet from 'react-helmet';
import { Grid, Row, Col, Nav, NavItem } from 'react-bootstrap';
import moment from 'moment';
import { uniq, map, filter, findIndex, sortBy } from 'lodash';

import { setGrantSide } from '../actions/ui';

import Grants from '../components/Grants';

class Organization extends React.Component {

  constructor(args) {
    super(args);
  }

  render() {
    const { loading, ledgerOrganization, funded, received } = this.props.data;

    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <Grid>
        <Helmet title={ledgerOrganization.name} />
        <Row>
          <Col xs={12}>
            <h3>{ledgerOrganization.name}</h3>
          </Col>
          <Col xs={12}>
            <Nav bsStyle="tabs" activeKey={this.props.grantSide} onSelect={this.props.handleSetGrantSide}>
              <NavItem eventKey="funded">Grants funded</NavItem>
              <NavItem eventKey="received">Grants received</NavItem>
            </Nav>
            <Grants
              verb={this.props.grantSide}
              grantsReceived={this.props.data.grantsReceived}
              grantsFunded={this.props.data.grantsFunded}
              fundedYearlySums={this.props.data.fundedYearlySums}
              receivedYearlySums={this.props.data.receivedYearlySums}
            />
          </Col>
        </Row>
      </Grid>
    );
  }

}

Organization.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    ledgerOrganization: PropTypes.object,
  }).isRequired,
};

const ORG_QUERY = gql`
query getOrg($id: Int!) {
  ledgerOrganization(id: $id) {
    name
    ledgerGrantsFunded(limit: 10000) {
      id
      start
      end
      recipient {
        name
        id
      }
      amount
      description
    }
    ledgerGrantsReceived(limit: 10000) {
      id
      start
      end
      funder {
        name
        id
      }
      amount
      description
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
    options: ({ params }) => ({
      variables: { id: params.organizationId },
    }),
    props({ data: { loading, ledgerOrganization } }) {
      if (loading) {
        return { data: { loading: true } };
      }

      // Sort lists by org
      const flattenedGrantsReceived = sortBy(ledgerOrganization.ledgerGrantsReceived.map((grant) => {
        const start = moment(grant.start, 'ddd, DD MMM YYYY HH:mm:ss ZZ').year();
        const end = moment(grant.end, 'ddd, DD MMM YYYY HH:mm:ss ZZ').year();
        const years = `${start} - ${end}`;

        return {
          org: grant.funder.name,
          orgId: grant.funder.id,
          description: grant.description || 'n/a',
          amount: grant.amount,
          id: grant.id,
          start,
          end,
          years,
          summary: false,
        };
      }), function(grant) {
        // Sort by org id (boring) and then the inverse of the start year.
        return grant.orgId + (1 / grant.start);
      });

      const flattenedGrantsFunded = sortBy(ledgerOrganization.ledgerGrantsFunded.map((grant) => {
        const start = moment(grant.start, 'ddd, DD MMM YYYY HH:mm:ss ZZ').year();
        const end = moment(grant.end, 'ddd, DD MMM YYYY HH:mm:ss ZZ').year();
        const years = `${start} - ${end}`;

        return {
          org: grant.recipient.name,
          orgId: grant.recipient.id,
          description: grant.description || 'n/a',
          amount: grant.amount,
          id: grant.id,
          start,
          end,
          years,
          summary: false,
        };
      }), function(grant) {
        // Sort by org id (boring) and then the inverse of the start year.
        return grant.orgId + (1 / grant.start);
      });

      const { grants: grantsFunded, yearlySums: fundedYearlySums } = addSummaryRows(flattenedGrantsFunded);
      const { grants: grantsReceived, yearlySums: receivedYearlySums } = addSummaryRows(flattenedGrantsReceived);

      return {
        data: {
          loading,
          ledgerOrganization,
          grantsFunded,
          fundedYearlySums,
          grantsReceived,
          receivedYearlySums,
        },
      };
    },
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(Organization);

/**
 * Add summary rows to table data,
 * and provide yearly totals.
 */
function addSummaryRows(grantsOrig) {
  // Copy the provided array.
  const grants = grantsOrig;

  // Get orgs
  const uniqOrgs = uniq(map(grants, 'orgId'));

  // Get stats per org, and stick em right in the array of grants as summary rows!
  const yearlySums = {};
  let insertAt = 0;
  uniqOrgs.map((orgId) => {
    let org = '';

    const sum = filter(grants, { orgId }).reduce((memo, grant) => {
      // along the way, build our yearly sums!
      if (yearlySums[grant.start] > 0) {
        yearlySums[grant.start] += grant.amount;
      } else {
        yearlySums[grant.start] = grant.amount;
      }

      // This'll happen over and over but that is just fine. We just want the right name.
      org = grant.org;

      return memo + grant.amount;
    }, 0);

    // Find first row of this org's grant
    insertAt = findIndex(grants, { orgId }, insertAt);

    // Splice in their stats row there
    // Add 1 to search index since we inserted another row
    grants.splice(insertAt, 0, {
      org,
      description: `${org}:`,
      orgId,
      amount: sum,
      id: `summaryrow-${orgId}`,
      start: null,
      end: null,
      summary: true,
    });
  });

  return { grants, yearlySums };
}
