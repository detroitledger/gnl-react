import React from 'react';
import renderer from 'react-test-renderer';
import IrsData from '../IrsData.js';

// this test passes, but expected jest to create a __snapshots__ folder and .snap file in this directory??
test('IrsData component renders with irsOrganization data', () => {
  it('renders correctly', () => {
    const irsOrganization = { id: 1, ein: '111222333', filing_type: '990', total_revenue: 300 };
    const renderedComponent = renderer.create(
  	  <IrsData irsOrganization={irsOrganization} />
  	);

  	let tree = renderedComponent.toJSON();
  	expect(tree).toMatchSnapshot();
  });
});