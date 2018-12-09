import React, { PropTypes } from 'react';

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
