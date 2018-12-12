import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from '../containers/Layout';
import Home from '../containers/Home';
import About from '../containers/About';
import Organization from '../containers/Organization';
import Search from '../containers/Search';

export default function getRoutes(store) {
  const hasWindow = typeof window !== 'undefined';

  return (
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
      <Route path="organizations">
        <Route path=":organizationUuid" component={Organization} />
      </Route>
      <Route path="search" component={Search} />
    </Route>
  );
}
