import React, { Component } from 'react';
import './Bottombar.css';

import UserpdfSelector from './UserpdfSelector';

class Bottombar extends Component {
  render() {
    return (
      <div className="Bottombar">
        <UserpdfSelector />
      </div>
    );
  }
}

export default Bottombar;
