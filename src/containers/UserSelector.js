import React from 'react';
import { useQuery, gql } from '@apollo/client';
import PropTypes from 'prop-types';

import Select from 'react-select';

const GET_USERS = gql`
  query users {
    users {
      uuid
      name
    }
  }
`;

const UserSelector = ({ onUserSelected, setValue, value }) => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (error) {
    debugger;
    throw new Error('todo: catch?');
  }

  if (loading) return <>Loading...</>;

  const options = data.users
    ? data.users.map(({ name, uuid }) => ({
        label: name,
        value: uuid,
      }))
    : [value];

  const handleInputChange = (inputValue) => {
    setValue(inputValue);
  };

  const handleChange = (option) => {
    onUserSelected(option.value);
  };

  return (
    <Select
      isClearable
      value={value || undefined}
      onChange={handleChange}
      onInputChange={handleInputChange}
      className="basic-single"
      classNamePrefix="select"
      isLoading={loading}
      name="user"
      options={options}
    />
  );
};

UserSelector.propTypes = {
  onUserSelected: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default UserSelector;
