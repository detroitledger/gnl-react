import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import PropTypes from "prop-types";
import React from "react";

import Select from "react-select";

const GET_ORGS_NAMED_LIKE = gql`
  query orgNamedLike($nameLike: String!) {
    organizations(nameLike: $nameLike, limit: 20) {
      uuid
      name
    }
  }
`

/* TODO
const ADD_ORGANIZATION = gql`
  mutation addOrganization($input: OrganizationInput!) {
    addOrganization(input: $input) {
      uuid
    }
  }
`;
*/

const OrganizationSelector = ({ onOrgSelected, setValue, value }) => {
  const [
    getOrgsNamedLike,
    { isLoading, error, data = { organizations: [] } }
  ] = useLazyQuery(GET_ORGS_NAMED_LIKE);

  const options = data.organizations.map(({ name, uuid }) => {
    return {
      label: name,
      value: uuid
    };
  });

  const handleInputChange = inputValue => {
    setValue(inputValue);
    getOrgsNamedLike({ variables: { nameLike: `%${inputValue}%` } });
  };

  const handleChange = option => {
    onOrgSelected(option.value);
  };

  return (
    <Select
      isClearable
      onChange={handleChange}
      onInputChange={handleInputChange}
      className="basic-single"
      classNamePrefix="select"
      isLoading={isLoading}
      name="organization"
      options={options}
    />
  );
};

OrganizationSelector.propTypes = {
  onOrgSelected: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string
};

export default OrganizationSelector;
