import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import IrsData from '../components/IrsData';

// Component to query and process search result
const SearchResult = ({ loading, irsOrganization }) => {
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!irsOrganization) {
    return <p><em>EIN not found in IRS database</em></p>;
  }

  // Iterate over all ledger orgs that match irs ein
  const linkedOrgNames = irsOrganization.ledgerOrganizations.map((org, i) =>
    <li key={i}>
      <a href={'/organizations/' + org.id}>{org.name}</a>
    </li>
  );

  return (
    <div>
      <IrsData irsOrganization={irsOrganization} />
      <h4>Ledger organizations with EIN {irsOrganization.ein}</h4>
      <p>{linkedOrgNames}</p>
    </div>
  );

};

SearchResult.propTypes = {
  loading: PropTypes.bool.isRequired,
  irsOrganization: PropTypes.object // Not required bc null until query is successfully run
};

// Graphql query using ein as search parameter on irs organizations
const EIN_QUERY = gql`
  query getIrsOrgByEIN($ein: String!) {
    irsOrganization(ein: $ein) {
      id,
      ein,
      subsccd,
      pdf,
      filing_type,
      start_year,
      end_year,
      irs_year,
      filing_date,
      tax_period,
      contributions_and_grants,
      program_service_revenue,
      investment_income,
      other_revenue,
      total_revenue,
      grants_paid,
      benefits_paid,
      compensation,
      fundraising_fees,
      total_fundraising_expenses,
      other_expenses,
      total_expenses,
      revenue_less_expenses,
      total_assets,
      total_liabilities,
      net_assets,
      forms990 {
        id,
        ein,
        irs_year,
        tax_period,
        total_revenue,
        total_expenses,
        total_assets
      },
      ledgerOrganizations {
        id,
        ein,
        name
      }
    }
  }
`;

export default graphql(EIN_QUERY, {
  options: ({ ein }) => ({ 
    variables: { ein } 
  }),
  props: ({ data: { loading, irsOrganization } }) => ({
    loading, irsOrganization,
  }),
})(SearchResult);
