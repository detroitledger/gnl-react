import React from 'react';

import './Instructions.scss';

const Instructions = ({ tourStart }) => (
  <div className="Instructions">
    <button onClick={tourStart}>Show me a quick tour</button>
    <h1>How to enter grants for the Detroit Ledger</h1>
    <h2>Overview</h2>
    <p>The goal is to capture philanthropic giving that has an impact on Detroit.</p>
    <br />
    <p>Here’s what counts as Detroit impact:</p>
    <ul>
      <li>
        by <b>address</b>: the organization that is receiving funds is located in Detroit
      </li>
      <li>
        by <b>mission</b>: the organization has a mission focused on impacting Detroit, even though
        it is located elsewhere (such as Some Organization located in Livonia, MI)
      </li>
      <li>
        by <b>grant description</b>: the organization is involved in a project that will impact
        Detroit (though the organization may be based elsewhere)
      </li>
    </ul>
    <br />
    <p>
      The Detroit Ledger is made up mainly of two types of data records: <b>grants</b> and{' '}
      <b>organizations</b>. You're going to help us add grant records based on what you find in a
      funding organization's IRS Form 990. Each year, tax exempt nonprofits have to file a Form 990
      with the government. This form includes all sorts of information about the organization, but
      the part we're most interested in is called "Schedule I". This section contains a list of the
      organization's big donations it makes to other organizations.
    </p>
    <br />
    <h2>Getting started</h2>
    <ol>
      <li>
        Pick a 990; your 990 will show up on the left and the form will be on the right. The funder
        and fiscal year auto-populate
      </li>
      <li>Scroll through your 990 and find "Schedule I: Grants and Other Assistance..."</li>
      <li>
        Enter grants using the "Detroit impact" criteria above. Each grant needs a:
        <ul>
          <li>Start and end date</li>
          <li>Funder</li>
          <li>Recipient</li>
          <li>Source, eg "IRS 990 2016"</li>
          <li>Amount</li>
          <li>Description</li>
        </ul>
      </li>
      <li>If the recipient organization doesn't already exist, add it!</li>
      <li>
        Mark your 990 as "done". If you quit before you're done, we'll save your current page until
        next time
      </li>
    </ol>
    <br />
    <p>
      Still have questions? Read this{' '}
      <a href="https://docs.google.com/document/d/1wYjWxWi2OXLjTN6XDR4aQYO4B3rkqB6uvArdGCSeEAI/edit?usp=sharing">
        in-depth guide to data entry.
      </a>
    </p>
  </div>
);

export default Instructions;
