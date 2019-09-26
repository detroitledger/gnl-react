import React, { useState, Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import { Mutation } from '@apollo/react-components';

import Helmet from 'react-helmet';

import { Row, Col } from 'react-bootstrap';

import * as authActions from '../actions/auth';

const ADD_GRANT = gql`
mutation addGrant($input: GrantInput!) {
  addGrant(input: $input) {
    uuid
  }
}
`;

const ADD_ORGANIZATION = gql`
mutation addOrganization($input: OrganizationInput!) {
  addOrganization(input: $input) {
    uuid
  }
}
`;

const GET_ORGS_NAMED_LIKE = gql`
query orgNamedLike($nameLike: String!) {
  organizations(nameLike: $nameLike, limit: 20) {
    uuid
    name
  }
}
`;

const NameInput = ({ value, setValue, getOrgsNamedLike }) => (
  <input
    type="text"
    value={value}
    placeholder="Enter an organization name"
    onChange={e => {
      e.persist();
      setValue(e.target.value)
      getOrgsNamedLike({
        variables: { nameLike: `%${e.target.value}%` },
      })
    }}
  /> 
);

const OrgsNamedLike = ({ value, setValue, onOrgSelected }) => {
  console.log('re-rendering OrgsNamedLike')
  
  const [getOrgsNamedLike, { loading, error, data }] = useLazyQuery(GET_ORGS_NAMED_LIKE);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className="orgsNamedLike">
      <NameInput value={value} setValue={setValue} getOrgsNamedLike={getOrgsNamedLike} />
      <select name="org" onChange={e => onOrgSelected(e.target.value)}>
        {data && data.organizations && data.organizations.map(org => (
          <option key={org.uuid} value={org.uuid}>
            {org.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const AddGrant = () => {
  const [fromNameMatch, setFromNameMatch] = useState('');
  const [fromUuid, setFromUuid] = useState('');
  const [toNameMatch, setToNameMatch] = useState('');
  const [toUuid, setToUuid] = useState('');

  return (
    <div className="addGrant">
      <Mutation mutation={ADD_GRANT}>
        {(addGrant, { data }) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                addGrant({ variables: {
                  input: {
                    from: fromUuid,
                    to: toUuid,
                  }
                } });
              }}
            >
              From: <OrgsNamedLike value={fromNameMatch} setValue={setFromNameMatch} onOrgSelected={setFromUuid} />
              To: <OrgsNamedLike value={toNameMatch} setValue={setToNameMatch} onOrgSelected={setToUuid} />
              <button type="submit">Add Grant</button>
            </form>
          </div>
        )}
      </Mutation>
    </div>
  );
};

export class Admin extends Component {
  componentDidMount() {
    this.props.getUserWithSavedToken();
  }

  static propTypes = {
    gooUser: PropTypes.object,
    errorAuth: PropTypes.string,
    isFetchingAuth: PropTypes.bool,
    getUserWithSavedToken: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    callGoogleAuthEndpoint: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
  }

  authInProgress = () => (
    <div>
      <button className="bigmessage">
        Authenticating...
      </button>
    </div>
  );

  loginPrompt = () => (
    <div>
      <button className="bigmessage" onClick={this.props.login}>
        Log in to start entering grants
        {this.props.errorAuth &&
          <div>Auth error: {this.props.errorAuth}</div>
        }
      </button>
    </div>
  );

  render() {
    console.log('re-rendering Admin')
    if (this.props.isFetchingAuth) return this.authInProgress();

    if (!this.props.gooUser) {
      return this.loginPrompt();
    } else {
      return (
        <div className="App">
          <button onClick={this.props.logout}>Log out</button>
          <div>gooUser: {JSON.stringify(this.props.gooUser)}</div>
          <button onClick={this.props.callGoogleAuthEndpoint.bind(this, 'getGoogleUser')}>getGoogleUser</button>
          <AddGrant />
        </div>
      );
    }
  }
}

export default connect(
  ({ auth }) => ({
    errorAuth: auth.error,
    isFetchingAuth: auth.isFetching,
    gooUser: auth.user,
  }),
  authActions
)(Admin);
