import React, { PropTypes } from 'react';

class GrantTable extends React.Component {
  static propTypes = {
    grants: PropTypes.array.isRequired,
  };

  render() {
    const rows = this.props.grants.map(({ amount, description, start, end, funder }) => (
      <tr>
        <td>${amount}</td>
        <td>{description}</td>
        <td>{start}</td>
        <td>{end}</td>
        <td>{funder.name}</td>
      </tr>
    ));

    return <table>{rows}</table>;
  }
}

export default GrantTable;
