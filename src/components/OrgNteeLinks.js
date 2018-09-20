import React, { PropTypes } from 'react';

const OrgNteeLinks = (props) => {
  return (
    <div>
      {props.ntees.map((ntee, i) => (
        <a key={i} href="/ntees/{ntee.id}">{ntee.name}</a>
      ))}
    </div>
  );
};

OrgNteeLinks.propTypes = {
  ntees: PropTypes.array.isRequired,
};

export default OrgNteeLinks;
