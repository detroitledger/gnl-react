import React, { PropTypes } from 'react';
import { AutoSizer, Table, Column } from 'react-virtualized';
import numeral from 'numeral';

import YearlySumsBarchart from './YearlySumsBarchart';

const Grants = (props) => {
  const grants = (props.verb === 'funded') ? props.grantsFunded : props.grantsReceived;
  const sums = (props.verb === 'funded') ? props.fundedYearlySums : props.receivedYearlySums;
  const label = (props.verb === 'funded') ? 'Recipient' : 'Funder';

  const getClassName = ({ index }) => {
    if (grants[index] && grants[index].hasOwnProperty('summary') && grants[index].summary) {
      return 'summary';
    }

    return null;
  };

  const renderDollars = ({ cellData }) => {
    return numeral(cellData).format('0,0[.]00');
  };

  return (
    <div>
      <YearlySumsBarchart sums={sums} />
      <div style={{ minHeight: '300px', height: '100%' }}>
        <AutoSizer>
          {({ height, width }) => (
            <Table
              headerHeight={30}
              height={height}
              width={width}
              rowCount={grants.length}
              rowGetter={({ index }) => grants[index]}
              rowClassName={getClassName}
              rowHeight={({ index }) => 50}
            >
              <Column
                width={200}
                flexGrow={1}
                label={label}
                dataKey='description'
              />
              <Column
                width={100}
                label='Years'
                dataKey='years'
              />
              <Column
                width={100}
                label='Amount'
                dataKey='amount'
                cellRenderer={renderDollars}
              />
            </Table>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

Grants.propTypes = {
  grantsReceived: PropTypes.array.isRequired,
  grantsReceived: PropTypes.array.isRequired,
  fundedYearlySums: PropTypes.object.isRequired,
  receivedYearlySums: PropTypes.object.isRequired,
  grantsFunded: PropTypes.array.isRequired,
  verb: PropTypes.string.isRequired,
};

export default Grants;

