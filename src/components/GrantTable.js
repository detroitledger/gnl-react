import React from 'react';
import PropTypes from 'prop-types';

import YearlySumsBarchart from './YearlySumsBarchart';
import GrantRow from './GrantRow';

const Grants = ({ relatedGrants, verb, grants, sums }) => {
  const label = verb === 'funded' ? 'Recipient' : 'Funder';

  return (
    <div>
      {!relatedGrants ? sums && <YearlySumsBarchart sums={sums} /> : ``}
      <table className="grantsTable">
        <thead>
          <tr>
            <th>{label}</th>
            <th className="dates">Dates</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {grants &&
            grants.map((grant) => <GrantRow {...grant} key={grant.uuid} />)}
        </tbody>
      </table>
    </div>
  );
};

Grants.propTypes = {
  grants: PropTypes.array,
  sums: PropTypes.object.isRequired,
  verb: PropTypes.string.isRequired,
};

export default Grants;
