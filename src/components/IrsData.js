import React, { PropTypes } from 'react';

// Presentational component to display IRS data from SearchResult
const IrsData = ( props ) => {
  return (
    <div>
      <p>EIN: {props.irsOrganization.ein}</p>
      <p>Filing type: {props.irsOrganization.filing_type}</p>
      <p>Tax period: {props.irsOrganization.tax_period}</p>
      <p>Ledger name(s): {props.orgName}</p>
    </div>
  );
};

IrsData.propTypes = {
  irsOrganization: PropTypes.object.isRequired
};

export default IrsData;