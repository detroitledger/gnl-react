import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import numeral from 'numeral';

// Presentational component to display IRS data from SearchResult
const IrsData = ( props ) => {

  return (
    <div>
      <p>This organization files a Form {props.irsOrganization.filing_type} with the IRS.</p>
      <table>
       <thead>
         <tr>
           <th>Totals for tax period ending {moment(props.irsOrganization.forms990[0].tax_period, 'YYYYMM').format('MMM YYYY')}</th>
         </tr>
        </thead>
        <tbody>
          <tr>
            <td>Revenue</td>
            <td>{numeral(props.irsOrganization.forms990[0].total_revenue).format('$0,0[.]00')}</td>
          </tr>
          <tr>
            <td>Expenses</td>
            <td>{numeral(props.irsOrganization.forms990[0].total_expenses).format('$0,0[.]00')}</td>
          </tr>
          <tr>
            <td>Assets</td>
            <td>{numeral(props.irsOrganization.forms990[0].total_assets).format('$0,0[.]00')}</td>
          </tr>
          <tr>
            <td>Liabilities</td>
            <td>{numeral(props.irsOrganization.forms990[0].total_liabilities).format('$0,0[.]00')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

IrsData.propTypes = {
  irsOrganization: PropTypes.object.isRequired
};

export default IrsData;
