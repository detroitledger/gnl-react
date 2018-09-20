import React, { PropTypes } from 'react';
import { BarChart } from 'react-svg-chart';
import numeral from 'numeral';

const YearlySumsBarchart = ({ sums }) => {
  const data = Object.keys(sums).map((k, i) => ({
    label: k,
    value: sums[k],
  }));

  return (
    <BarChart
      bars={data}
      height={ 400 }
      width={ 600 }
      formatValue={v => `$${numeral(v).format('0,0[.]00')}`}
    />
  );
};

YearlySumsBarchart.propTypes = {
  sums: PropTypes.object.isRequired,
};

export default YearlySumsBarchart;
