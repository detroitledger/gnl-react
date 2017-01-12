import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// Presentational component to display search result
const SearchResult = ({ loading, irsOrganization }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!irsOrganization) {
    return <em>Not found</em>;
  }

  // Iterate over all ledger orgs that match irs org ein and return their name(s)
  const orgName = irsOrganization.ledgerOrganizations.map((org, i) =>
    <li key={i}>
      {org.name}
    </li>
  );

  return (
    <div>
      <p>EIN: {irsOrganization.ein}</p>
      <p>Filing type: {irsOrganization.filing_type}</p>
      <p>Tax period: {irsOrganization.tax_period}</p>
      <p>Ledger name(s): {orgName}</p>
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
      ledgerOrganizations {
        id,
        ein,
        name,
        description,
        ntees {
          id,
          name
        },
        start,
        end,
        received,
        funded,
        stateCorpId
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
