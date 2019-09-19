import React from 'react';
import PropTypes from 'prop-types';

import './DoneUserpdf.scss';

const DoneUserpdf = ({ toggleDoneHandler }) => (
  <div className="DoneUserpdf">
    <label htmlFor="done">Mark as done?&nbsp;</label>
    <input
      id="done"
      type="checkbox"
      checked={toggleDoneHandler.value}
      onClick={() => toggleDoneHandler.requestChange(!toggleDoneHandler.value)}
    />
  </div>
);

DoneUserpdf.propTypes = {
  toggleDoneHandler: PropTypes.object.isRequired,
};

export default DoneUserpdf;
