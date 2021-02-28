import React from 'react';
import Helmet from 'react-helmet';

import Page from 'components/Page';
import Search from 'containers/Search';
import Stats from 'containers/Stats';
import TopLists from 'containers/TopLists';


export default function Index() {
  return (
    <section className="home">
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
