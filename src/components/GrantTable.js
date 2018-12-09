import React, { PropTypes } from 'react';

import YearlySumsBarchart from './YearlySumsBarchart';
import GrantRow from './GrantRow';

const Grants = (props) => {
  const grants = props.verb === 'funded' ? props.grantsFunded : props.grantsReceived;
  const sums = props.verb === 'funded' ? props.fundedYearlySums : props.receivedYearlySums;
  const label = props.verb === 'funded' ? 'Recipient' : 'Funder';

  return (
    <div>
      <YearlySumsBarchart sums={sums} />
      <table className="grantsTable">
        <thead>
          <tr>
            <th>Grant</th>
            <th className="dates">Dates</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {grants.map(grant => (
            <GrantRow {...grant} key={grant.uuid} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

Grants.propTypes = {
  grantsReceived: PropTypes.array.isRequired,
  grantsFunded: PropTypes.array.isRequired,
  fundedYearlySums: PropTypes.object.isRequired,
  receivedYearlySums: PropTypes.object.isRequired,
  verb: PropTypes.string.isRequired,
};

export default Grants;
