import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';
import Helmet from 'react-helmet';

class Organization extends React.Component {

  constructor(args) {
    super(args);
  }

  render() {
    const { loading, ledgerOrganization } = this.props.data;

    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <Helmet title={ledgerOrganization.name} />
        <h4>{ledgerOrganization.name}</h4>
      </div>
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
