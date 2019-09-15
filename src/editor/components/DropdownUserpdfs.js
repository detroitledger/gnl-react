import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import Dropdown from 'react-dropdown';

import './DropdownUserpdfs.scss';

class DropdownUserpdfs extends Component {
  _onSelect = ({ value }) => {
    this.props.dispatch(push('/' + value));
  };

  render() {
    const options = [];
    const { userpdfId } = this.props;

    for (let i = 0; i < this.props.userpdfs.length; i++) {
      const {
        id,
        year,
        currentpg,
        'org': {
          'name': orgName,
        },
      } = this.props.userpdfs[i];

      const pagelabel = currentpg > 0 ? `(page ${currentpg})` : '(new!)';

      options.push({
        value: id,
        label:
          `${orgName}, ${year} ${pagelabel}`,
      });
    }

    if (this.props.userpdfs.length > 0) {
      return (
        <Dropdown
          options={options}
          onChange={this._onSelect}
          value={options.find(function(o) {
            return o.value === parseInt(userpdfId, 10);
          })}
          placeholder="Pick a 990"
        />
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

DropdownUserpdfs.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userpdfId: PropTypes.string,
  userpdfs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      org: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      pdfurl: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
      year: PropTypes.number.isRequired,
      currentpg: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};

export default DropdownUserpdfs;
