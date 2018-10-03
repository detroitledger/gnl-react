import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import promiseMiddleware from '../middleware/promiseMiddleware';
import combiner from '../reducers';

const middleware = routerMiddleware(browserHistory);

const middlewares = [applyMiddleware(promiseMiddleware, middleware)];

export default function configureStore(initialState = {}) {
  const hasWindow = typeof window !== 'undefined';

  const store = createStore(
    combiner(),
    initialState,
    compose(
      ...middlewares,
      hasWindow && window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers/index')().default; // eslint-disable-line
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
