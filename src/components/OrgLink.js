import React from 'react';
import { string } from 'prop-types';

import { Link } from 'react-router-dom';

import { slugify } from '../utils';

const OrgLink = ({ name, uuid }) => (
  <Link to={`/organizations/${slugify(name)}/${uuid}`}>
    <strong>{name}</strong>
  </Link>
);

OrgLink.propTypes = {
  name: string.isRequired,
  uuid: string.isRequired,
};

export default OrgLink;
