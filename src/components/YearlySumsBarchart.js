import React from 'react';
import PropTypes from 'prop-types';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

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

  return (
    <figure>
      <figcaption>
        Graph of totals by year, {startYear} - {endYear}
      </figcaption>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height={data.length * 25}
        role="img"
      >
        {data.map((d, i) => (
          <g key={d.label}>
            <rect x="0" y={i * 25} fill="#ccc" width="100%" height="25"></rect>
            <rect
              x="0"
              y={i * 25}
              fill="#0088cc"
              width={`${(d.value / max || 0) * 100}%`}
              height="25"
            ></rect>
            <text x="6" y={i * 25 + 12} fill="#fff" dy=".35em">
              {d.label}: {formatter.format(d.value)}
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
