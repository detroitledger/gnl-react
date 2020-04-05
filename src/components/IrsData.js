import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import numeral from 'numeral';

// Presentational component to display IRS data from SearchResult
const IrsData = ({ form990 }) => (
  <div>
    <p>This organization files a Form {form990.filing_type} with the IRS.</p>
    <table>
      <thead>
        <tr>
          <th>
            Totals for tax period ending{' '}
            {moment(form990.tax_period, 'YYYYMM').format('MMM YYYY')}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Revenue</td>
          <td>{numeral(form990.total_revenue).format('$0,0[.]00')}</td>
        </tr>
        <tr>
          <td>Expenses</td>
          <td>{numeral(form990.total_expenses).format('$0,0[.]00')}</td>
        </tr>
        <tr>
          <td>Assets</td>
          <td>{numeral(form990.total_assets).format('$0,0[.]00')}</td>
        </tr>
        <tr>
          <td>Liabilities</td>
          <td>{numeral(form990.total_liabilities).format('$0,0[.]00')}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

IrsData.propTypes = {
  form990: PropTypes.shape({
    filing_type: PropTypes.string.isRequired,
    tax_period: PropTypes.string.isRequired,
    total_revenue: PropTypes.number.isRequired,
    total_expenses: PropTypes.number.isRequired,
    total_assets: PropTypes.number.isRequired,
    total_liabilities: PropTypes.number.isRequired,
  }).isRequired,
};

export default IrsData;
