import React, { PropTypes } from 'react';
import { AutoSizer, Table, Column } from 'react-virtualized';

const Grants = (props) => {
  const grants = (props.verb === 'funded') ? props.grantsFunded : props.grantsReceived;
  const label = (props.verb === 'funded') ? 'Recipient' : 'Funder';

  return (
    <div style={{ minHeight: '300px', height: '100%' }}>
      <AutoSizer>
        {({ height, width }) => (
          <Table
            headerHeight={30}
            height={height}
            width={width}
            rowCount={grants.length}
            rowGetter={({ index }) => grants[index]}
            rowHeight={({ index }) => 50}
          >
            <Column
              width={200}
              flexGrow={1}
              label={label}
              dataKey={'description'}
            />
            <Column
              width={100}
              label='Amount'
              dataKey='amount'
            />
          </Table>
        )}
      </AutoSizer>
    </div>
  );
}

Grants.propTypes = {
  grantsReceived: PropTypes.array.isRequired,
  grantsFunded: PropTypes.array.isRequired,
  verb: PropTypes.string.isRequired,
};

export default Grants;

