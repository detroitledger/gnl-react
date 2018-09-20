import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import numeral from 'numeral';

const OrgFinances = (props) => {
  const finances = props.forms990.map((form990, i) => {
    let grants_paid = false;
    if (form990.grants_paid) {
      grants_paid = (
        <tr>
          <td>Grants Paid</td>
          <td className="amt">${numeral(form990.grants_paid).format('0,0[.]00')}</td>
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
              <td className="amt">${numeral(form990.total_revenue).format('0,0[.]00')}</td>
            </tr>
            {grants_paid || null}
            <tr>
              <td>Total Expenses</td>
              <td className="amt">${numeral(form990.total_expenses).format('0,0[.]00')}</td>
            </tr>
            <tr>
              <td>Assets</td>
              <td className="amt">${numeral(form990.total_assets).format('0,0[.]00')}</td>
            </tr>
            <tr>
              <td>Liabilities</td>
              <td className="amt">${numeral(form990.total_liabilities).format('0,0[.]00')}</td>
            </tr>
          </tbody>
        </table>
      </Col>
    );
  });

  return (
    <Row>
      <Col md={12}>
        <div id="finances">
          <h2>Finances</h2>
          <p>
            Dates represent the end of the organization's fiscal year, often different from the
            calendar year. Not all figures are available for all organizations. Data is from IRS 990
            filings.
          </p>

          <Row>{finances}</Row>
        </div>
      </Col>
    </Row>
  );
};

OrgFinances.propTypes = {
  forms990: PropTypes.array.isRequired,
};

export default OrgFinances;
