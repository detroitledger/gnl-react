import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

const YearlySumsBarchart = ({ sums }) => {
  const data = Object.keys(sums).map((k, i) => ({
    label: k,
    value: sums[k],
  }));

  return (
  <div>todo: new barchart lib</div>
  );
};

YearlySumsBarchart.propTypes = {
  sums: PropTypes.object.isRequired,
};

export default YearlySumsBarchart;
