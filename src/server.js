import React from 'react';
import serialize from 'serialize-javascript';
import csrf from 'csurf';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { createNetworkInterface } from 'apollo-client';
import { createMemoryHistory, RouterContext, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import express, { Router } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import proxy from 'http-proxy-middleware';
import 'isomorphic-fetch';

import createApolloClient from './network/create-apollo-client';
import getRoutes from './routes';
import configureStore from './store/configureStore';
import { setCsrfToken } from './actions/form';
import Html from './components/Html';

const NODE_ENV = process.env.NODE_ENV || 'development';
const IP = process.env.IP || '0.0.0.0';
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL || 'http://detroitledger.org:8081';

const app = express();

// mount api before csrf is set up
const apiProxy = proxy({ target: API_URL });
app.use('/graphql', apiProxy);
app.use('/signin', apiProxy); // for future use ;)
app.use('/user', apiProxy); // also for future use ;) ;)

const router = new Router();
const routes = getRoutes();

router.use(csrf({ cookie: true }));

router.use((req, res, next) => {
  if (NODE_ENV === 'development') {
    global.webpackIsomorphicTools.refresh();
  }

  const client = createApolloClient({
    ssrMode: true,
    networkInterface: createNetworkInterface({
      uri: process.env.API_URL || 'http://detroitledger.org:8081',
      opts: {
        credentials: 'same-origin',
        headers: req.headers,
      },
    }),
  });

  const memoryHistory = createMemoryHistory(req.url);
  const store = configureStore({}, client);
  const history = syncHistoryWithStore(memoryHistory, store);

  //store.dispatch(setCsrfToken(req.csrfToken()));

  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    }

    if (error || !renderProps) {
      return next(error);
    }

    const reactApp = (
      <ApolloProvider client={client}>
        <RouterContext {...renderProps} />
      </ApolloProvider>
    );

    getDataFromTree(reactApp).then(() => {
      const content = renderToString(reactApp);
      debugger;

      const assets = global.webpackIsomorphicTools.assets();
      const initialState = `window.__INITIAL_STATE__ = ${serialize(store.getState())}`;

      const apolloStateData = {[client.reduxRootKey]: {
        data: client.store.getState()[client.reduxRootKey].data,
      }};
      const apolloState = `window.__APOLLO_STATE__ = ${serialize(apolloStateData)}`;


      const markup = <Html {...{ assets, initialState, apolloState, content }} />;
      const doctype = '<!doctype html>\n';
      const html = renderToStaticMarkup(markup);

      res.send(doctype + html);
    }).catch((err) => {
      console.log(err);
      res.status(500).end();
    });
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('../dist'));
app.use(router);

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`Listening on http://${IP}:${PORT}`);
  }
});

export default app;

