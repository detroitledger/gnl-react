import React from 'react';
import Helmet from 'react-helmet';

import Page from '../components/Page';
import Search from './Search';
import Stats from './Stats';
import TopLists from './TopLists';

export default function Index() {
  return (
    <section>
      <Page>
        <Helmet title="Homepage" />
        <h1>The Detroit Ledger</h1>
        <Stats />
        <Search />
        <TopLists />
      </Page>
    </section>
  );
}
