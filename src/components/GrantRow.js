import React from 'react';
import numeral from 'numeral';

import { slugify } from '../utils';

const GrantRow = ({ amount, description, org, orgUuid, summary, years, uuid }) => {
  let name = description;

  if (summary) {
    name = <strong><a href={`/organizations/${slugify(name)}/${orgUuid}`}>{org}</a></strong>;
  } else if (uuid) {
    name = <span>{name} <a href={`/grants/${uuid}`}>>></a></span>;
  }

  return (
    <tr className={summary ? 'summary' : ''}>
      <td>{name}</td>
      <td>{years}</td>
      <td className="amount">{numeral(amount).format('0,0[.]00')}</td>
    </tr>
  );
};

export default GrantRow;
