import { useLazyQuery, gql } from '@apollo/client';
import PropTypes from 'prop-types';
import React from 'react';

import Select from 'react-select';

const GET_ORGS_NAMED_LIKE = gql`
  query orgNamedLike($nameLike: String!) {
    organizations(nameLike: $nameLike, limit: 20) {
      uuid
      name
    }
  }
`;

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
    { isLoading, error, data = { organizations: [] } },
  ] = useLazyQuery(GET_ORGS_NAMED_LIKE);

  if (error) {
    debugger;
  }

  const options = data.organizations
    ? data.organizations.map(({ name, uuid }) => ({
        label: name,
        value: uuid,
      }))
    : [value];

  const handleInputChange = (inputValue) => {
    setValue(inputValue);
    getOrgsNamedLike({ variables: { nameLike: `%${inputValue}%` } });
  };

  const handleChange = (option) => {
    onOrgSelected(option.value);
  };

  return (
    <Select
      isClearable
      value={value || undefined}
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
  value: PropTypes.string,
};

export default OrganizationSelector;
