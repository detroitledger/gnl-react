import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import numeral from 'numeral';

const Amt = ({ value }) => <td className="amt">{numeral(value).format('0,0[.]00')}</td>;

const OrgFinances = ({ forms990 }) => {
  if (!forms990 || forms990.length === 0) return null;

  const sortedForms = forms990.sort(f => f.year);

  const finances = sortedForms.map((form990, i) => {
    let grantsPaid = false;
    if (form990.grants_paid) {
      grantsPaid = (
        <tr>
          <td>Grants Paid</td>
          <Amt value={form990.grants_paid} />
        </tr>
      );
    }

    return (
      <Col sm={3} key={i}>
        <table>
          <tbody>
            <tr>
              <th colSpan="2">
                {form990.monthText} {form990.year}
              </th>
            </tr>
            <tr>
              <td>Revenue</td>
              <Amt value={form990.total_revenue} />
            </tr>
            {grantsPaid || null}
            <tr>
              <td>Total Expenses</td>
              <Amt value={form990.total_expenses} />
            </tr>
            <tr>
              <td>Assets</td>
              <Amt value={form990.total_assets} />
            </tr>
            <tr>
              <td>Liabilities</td>
              <Amt value={form990.total_liabilities} />
            </tr>
          </tbody>
        </table>
      </Col>
    );
  });

  return (
    <div className="finances">
      <h2>Finances</h2>
      <p>
        Dates represent the end of the organization's fiscal year, often different from the calendar
        year. Not all figures are available for all organizations. Data is from IRS 990 filings.
      </p>

      <Row>{finances}</Row>
    </div>
  );
};

OrgFinances.propTypes = {
  forms990: PropTypes.array.isRequired,
};

export default OrgFinances;
