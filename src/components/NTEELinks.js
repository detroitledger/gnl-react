import React, { PropTypes } from 'react';

const NTEELinks = (props) => {
  return (
    <div className="tags">
      {props.ntees.map((ntee, i) => (
        <a key={i} href="/ntees/{ntee.id}" className="tag">
          {ntee.name}
        </a>
      ))}
    </div>
  );
};

NTEELinks.propTypes = {
  ntees: PropTypes.array.isRequired,
};

export default NTEELinks;
