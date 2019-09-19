import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import promiseMiddleware from '../middleware/promiseMiddleware';
import combiner from '../reducers';

export default function configureStore(initialState = {}, history) {
  const hasWindow = typeof window !== 'undefined';

  const middleware = [thunk, routerMiddleware(history), promiseMiddleware];

  const store = createStore(
    combiner(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      hasWindow && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f,
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
