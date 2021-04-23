import React from 'react';
import PropTypes from 'prop-types';

import { dollarsFormatter } from '../utils';


const YearlySumsBarchart = ({ sums }) => {
  const data = Object.keys(sums).map((k, i) => ({
    label: k,
    value: sums[k],
  }));

  const max = Object.values(sums).reduce(
    (acc, cur) => (cur > acc ? cur : acc),
    0
  );

  const startYear = Object.keys(sums).reduce(
    (acc, cur) => (cur < acc ? cur : acc),
    Infinity
  );

  const endYear = Object.keys(sums).reduce(
    (acc, cur) => (cur > acc ? cur : acc),
    0
  );

  const baseHeight = 35;

  return (
    <figure style={{ margin: `5px 0 5px 0` }}>
      <figcaption style={{ fontWeight: 700, color: `#04ae36` }}>
        Annual grant totals, {startYear} - {endYear}
      </figcaption>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height={data.length * baseHeight}
        role="img"
      >
        {data.map((d, i) => (
          <g key={d.label}>
            <rect 
              x="0"
              y={i * baseHeight}
              width="100%"
              height={`${baseHeight}`}
              fill="#ebf9ef"
            ></rect>
            <rect
              x="0"
              y={i * baseHeight}
              width={`${(d.value / max || 0) * 100}%`}
              height={`${baseHeight}`}
              fill="#04ae36"
              stroke="#ebf9ef"
              strokeWidth="3px"
            ></rect>
            <text 
              x="6"
              y={i * baseHeight + (baseHeight / 2)}
              dy=".35em"
              fill="#000"
            >
              {d.label}: {dollarsFormatter.format(d.value)}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
};

YearlySumsBarchart.propTypes = {
  sums: PropTypes.object.isRequired,
};

export default YearlySumsBarchart;
