import IrsData from './IrsData.js';
import React from 'react';
import renderer from 'react-test-renderer';

// this test passes, but expected jest to export a .snap file in this directory??
it('IrsData component renders irsOrganization data', () => {
  const form990 = {
    id: 1,
    ein: '111222333',
    filing_type: '990',
    tax_period: '201206',
    total_revenue: 300,
    total_expenses: 301,
    total_assets: 302,
    total_liabilities: 303,
  };

  const rendered = renderer.create(<IrsData form990={form990} />);

  expect(rendered.toJSON()).toMatchSnapshot();
});
