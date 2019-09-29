import React, { useState } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { gql } from "apollo-boost";
import { Mutation } from "@apollo/react-components";

import * as authActions from "../actions/auth";
import OrganizationSelector from "./OrganizationSelector";

const ADD_GRANT = gql`
  mutation addGrant($input: GrantInput!) {
    addGrant(input: $input) {
      uuid
    }
  }
`;

const AddGrant = () => {
  const [fromNameMatch, setFromNameMatch] = useState("");
  const [fromUuid, setFromUuid] = useState("");
  const [toNameMatch, setToNameMatch] = useState("");
  const [toUuid, setToUuid] = useState("");

  // TODO
  // <Redirect to="/admin" /> or render a Login form if we're not

  return (
    <div className="addGrant">
      <Mutation mutation={ADD_GRANT}>
        {addGrant => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                addGrant({
                  variables: {
                    input: {
                      from: fromUuid,
                      to: toUuid
                    }
                  }
                });
              }}
            >
              <label htmlFor="fromOrganization">From</label>
              <OrganizationSelector
                value={fromNameMatch}
                setValue={setFromNameMatch}
                onOrgSelected={setFromUuid}
              />
              <label htmlFor="toOrganization">To</label>
              <OrganizationSelector
                value={toNameMatch}
                setValue={setToNameMatch}
                onOrgSelected={setToUuid}
              />
              <button type="submit">Add Grant</button>
            </form>
          </div>
        )}
      </Mutation>
    </div>
  );
};

export default AddGrant;
