import React, { PropTypes } from 'react';
import { graphql, compose } from 'react-apollo';
import { Tab, Tabs } from 'react-bootstrap';
import Helmet from 'react-helmet';
import gql from 'graphql-tag';

import Page from '../components/Page';
import GrantTable from '../components/GrantTable';

class Organization extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      ledgerOrganization: PropTypes.object,
    }).isRequired,
  };

  render() {
    const { loading, ledgerOrganization } = this.props.data;
    const {
      name,
      description,
      received,
      funded,
      ledgerGrantsFunded,
      ledgerGrantsReceived,
    } = ledgerOrganization;
    console.log(ledgerOrganization);

    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <Page>
        <Helmet title={name} />
        <h1>{name}</h1>
        <p>{description}</p>
        <h2>Grant Data</h2>
        <p>
          Describes grants Ledger staff have been able to document. Does not reflect a full,
          official record of all funding.
        </p>
        <Tabs defaultActiveKey={1} id="grants">
          <Tab eventKey={1} title={`Received ${received}`}>
            <GrantTable grants={ledgerGrantsFunded} />
          </Tab>
          <Tab eventKey={2} title={`Funded ${funded}`}>
            <GrantTable grants={ledgerGrantsReceived} />
          </Tab>
        </Tabs>
        ;
      </Page>
    );
  }
}

const ORG_QUERY = gql`
  query getOrg($id: Int!) {
    ledgerOrganization(id: $id) {
      name
      description
      ein
      received
      funded
      ledgerGrantsFunded(limit: 10000) {
        id
        ein
        funder {
          id
          name
        }
        recipient {
          id
          name
        }
        start
        end
        amount
        description
      }
      ledgerGrantsReceived(limit: 10000) {
        id
        ein
        funder {
          id
          name
        }
        recipient {
          id
          name
        }
        start
        end
        amount
        description
      }
    }
  }
`;

export default compose(
  graphql(ORG_QUERY, {
    options: ({ params }) => ({
      variables: { id: params.organizationId },
    }),
    props({ data: { loading, ledgerOrganization } }) {
      return { data: { loading, ledgerOrganization } };
    },
  }),
)(Organization);
