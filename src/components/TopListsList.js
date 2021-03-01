import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { dollarsFormatter, slugify } from '../utils';

const TopListsList = ({ organizations, direction }) => (
    <ol>
      {organizations.map((o, i) => (
        <li key={i}>
          <Link to={`/organizations/${slugify(o.name)}/${o.uuid}`}>
            {o.name}
          </Link>
          <span> ({dollarsFormatter.format(o[direction])})</span>
        </li>
      ))}
    </ol>
);

TopListsList.propTypes = {
  organizations: PropTypes.array.isRequired,
  direction: PropTypes.string.isRequired,
};

export default TopListsList;
