import IrsData from './IrsData.js';
import React from 'react';
import renderer from 'react-test-renderer';

// this test passes, but expected jest to export a .snap file in this directory??
test('IrsData component renders irsOrganization data', () => {
  it('renders correctly', () => {
    const irsOrganization = { id: 1, ein: '111222333', filing_type: '990', total_revenue: 300 };
    const rendered = renderer.create(
  	  <IrsData irsOrganization={irsOrganization} />
  	);
  	expect(rendered.toJSON()).toMatchSnapshot();
  });
});