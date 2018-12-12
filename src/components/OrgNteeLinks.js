import React from 'react';
import PropTypes from 'prop-types';

const OrgNteeLinks = (props) => {
  return (
    <div className="tags">
      {props.ntees.map((ntee, i) => (
        <a key={i} href={`/ntees/${ntee.uuid}`} className="tag">
          {ntee.name}
        </a>
      ))}
    </div>
  );
};

OrgNteeLinks.propTypes = {
  ntees: PropTypes.array.isRequired,
};

export default OrgNteeLinks;
