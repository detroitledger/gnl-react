import React from 'react';

import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';

export default () => {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Grants</h2>
      <Switch>
        <Route path={`${match.path}/:grantId`}>
          <Grant />
        </Route>
        <Route path={match.path}>
          <h3>Please specify a grant.</h3>
        </Route>
      </Switch>
    </div>
  );
};

const Grant = () => {
  let { grantId } = useParams();
  return <h3>Requested grant ID: {grantId}</h3>;
};
