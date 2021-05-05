import React, { useState } from 'react';

import { bool, func, number, shape, string } from 'prop-types';

import OrganizationSelector from '../containers/OrganizationSelector';
import UserSelector from '../containers/UserSelector';

const onNumericChange = (currentValue, setter) => (e) => {
  const parsed = parseInt(e.target.value, 10);
  isNaN(parsed) ? setter(currentValue) : setter(parsed);
};

const PdfForm = ({ onSubmit, defaultValues = {} }) => {
  const [organizationNameMatch, setOrganizationNameMatch] = useState(
    defaultValues.organization && {
      label: defaultValues.organization.name,
      value: defaultValues.organization.uuid,
    }
  );
  const [organization, setOrganization] = useState(
    defaultValues.organization && defaultValues.organization.uuid
  );
  const [userNameMatch, setUserNameMatch] = useState(
    defaultValues.user && {
      label: defaultValues.user.name,
      value: defaultValues.user.uuid,
    }
  );
  const [user, setUser] = useState(
    defaultValues.user && defaultValues.user.uuid
  );
  const [year, setYear] = useState(defaultValues.year);
  const [url, setUrl] = useState(defaultValues.url);
  const [currentPage, setCurrentPage] = useState(defaultValues.currentPage);
  const [done, setDone] = useState(defaultValues.done);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      organization,
      user,
      url,
      done: !!done,
      year,
      current_page: currentPage,
    });
  };

  const onYearChange = onNumericChange(year, setYear);
  const onCurrentPageChange = onNumericChange(currentPage, setCurrentPage);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="organization">Organization</label>
        <OrganizationSelector
          value={organizationNameMatch}
          setValue={setOrganizationNameMatch}
          onOrgSelected={setOrganization}
        />
      </div>

      <div className="form-group">
        <label htmlFor="user">User</label>
        <UserSelector
          value={userNameMatch}
          setValue={setUserNameMatch}
          onUserSelected={setUser}
        />
      </div>

      <div className="form-group">
        <label htmlFor="year">Year</label>
        <input
          value={year}
          onChange={onYearChange}
          name="year"
          type="number"
          min={1900}
          max={new Date().getUTCFullYear() + 1}
        />
      </div>

      <div className="form-group">
        <label htmlFor="url">Url</label>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          name="url"
          type="url"
        />
      </div>

      <div className="form-group">
        <label htmlFor="currentPage">Current Page</label>
        <input
          type="number"
          min={1}
          value={currentPage}
          name="currentPage"
          onChange={onCurrentPageChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="done">Done?</label>
        <input
          type="checkbox"
          checked={!!done}
          name="done"
          onChange={(e) => setDone(e.target.checked)}
        />
      </div>

      <button type="submit">{defaultValues.uuid ? 'Update' : 'Add'} PDF</button>
    </form>
  );
};

PdfForm.propTypes = {
  onSubmit: func.isRequired,
  defaultValues: shape({
    organization: shape({
      uuid: string,
      name: string,
    }),
    user: shape({
      uuid: string,
      name: string,
    }),
    url: string,
    done: bool,
    year: number,
    currentPage: number,
  }),
};

PdfForm.defaultProps = {
  defaultValues: {
    url: '',
    done: false,
    year: new Date().getUTCFullYear(),
    currentPage: 1,
  },
};

export default PdfForm;
