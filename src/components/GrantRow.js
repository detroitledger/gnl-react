import React, { PropTypes } from 'react';
import numeral from 'numeral';

const GrantRow = ({ amount, description, org, orgId, summary, years }) => {
  let name = description;
  if (summary) {
    name = <a href={`/organizations/${orgId}`}>{org}</a>;
  }
  return (
    <tr className={summary ? 'summary' : ''}>
      <td>{name}</td>
      <td>{years}</td>
      <td className="amount">${numeral(amount).format('0,0[.]00')}</td>
    </tr>
  );
};

export default GrantRow;
