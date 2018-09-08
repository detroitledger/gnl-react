import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import Page from '../components/Page';
import Search from './Search';

export default function Index() {
  return (
    <section>
      <Page>
        <Helmet title="Homepage" />
        <h1>The Detroit Ledger</h1>
        <h2>
          Search <strong>1,657</strong> organizations and <strong>14,189</strong> grants covering{' '}
          <strong>$4,667,334,800</strong> in Detroit.
        </h2>

        <Search />
      </Page>
    </section>
  );
}
