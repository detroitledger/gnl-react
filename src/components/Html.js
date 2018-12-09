import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

const Html = ({ apolloState, assets, content, initialState, state, config }) => {
  const helmet = Helmet.rewind();
  const attrs = helmet.htmlAttributes.toComponent();

  return (
    <html {...attrs}>
      <head>
        {helmet.title.toComponent()}

        {helmet.meta.toComponent()}

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {helmet.link.toComponent()}

        <link
          rel="stylesheet"
          type="text/css"
          href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"
        />
      </head>
      <body>
        <main id="app" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(apolloState).replace(
              /</g,
              '\\u003c',
            )}; window.config=${JSON.stringify(config).replace(
              /</g,
              '\\u003c',
            )};`,
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: initialState }} />
        {Object.keys(assets.javascript).map(key => (
          <script key={key} src={assets.javascript[key]} />
        ))}
      </body>
    </html>
  );
};

Html.propTypes = {
  assets: PropTypes.object.isRequired,
  initialState: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Html;
