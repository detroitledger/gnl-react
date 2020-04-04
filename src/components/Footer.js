import React from 'react';

export default () => (
  <footer>
    <div className="container">
      <form
        action="https://detroitledger.us7.list-manage.com/subscribe/post?u=5f6c82c52e266389140a08ab5&amp;id=ffe8bfd2f0"
        method="post"
        name="mc-embedded-subscribe-form"
        target="_blank"
      >
        Subscribe for news and updates on Detroit nonprofits:
        <input placeholder="Your email" type="email" name="EMAIL" />
        <input type="submit" value="Subscribe" name="subscribe" />
        <div style={{ position: 'absolute', left: '-5000px' }}>
          <input
            type="text"
            name="b_5f6c82c52e266389140a08ab5_ffe8bfd2f0"
            tabIndex="-1"
            readOnly
            value=""
          />
        </div>
      </form>

      <p>
        This data is made available under the{' '}
        <a href="http://opendatacommons.org/licenses/odbl/1.0/">
          Open Database License
        </a>
        . Any rights in individual contents of the database are licensed under
        the{' '}
        <a href="http://opendatacommons.org/licenses/dbcl/1.0/">
          Database Contents License.
        </a>
      </p>
    </div>
  </footer>
);
