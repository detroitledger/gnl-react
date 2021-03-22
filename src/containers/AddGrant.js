import React, { useState } from 'react';

import { gql, useMutation } from '@apollo/client';
import DatePicker from 'react-datepicker';

import { Link } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';

import OrganizationSelector from './OrganizationSelector';

const ADD_GRANT = gql`
  mutation addGrant($input: GrantInput!) {
    addGrant(input: $input) {
      uuid
    }
  }
`;

const AddGrant = () => {
  const [fromNameMatch, setFromNameMatch] = useState('');
  const [from, setFromUuid] = useState('');
  const [toNameMatch, setToNameMatch] = useState('');
  const [to, setToUuid] = useState('');
  const [amount, setAmount] = useState(0);
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [source, setSource] = useState();
  const [description, setDescription] = useState();
  const [internalNotes, setInternalNotes] = useState();

  const [
    addGrant,
    { loading: addGrantLoading, error: addGrantError, data: addGrantData },
  ] = useMutation(ADD_GRANT);

  // TODO
  // <Redirect to="/admin" /> or render a Login form if we're not

  if (addGrantError) {
    console.log(
      'xxx',
      addGrantError.message,
      addGrantError.graphQLErrors,
      addGrantError.extraInfo,
      addGrantError.networkError,
      addGrantError.errors,
      addGrantData
    );
  }
  const error = addGrantError && <p>{addGrantError.message}</p>;
  const created = addGrantData && (
    <p>
      Added grant{' '}
      <Link to={`/grants/${addGrantData.addGrant.uuid}`}>
        {addGrantData.addGrant.uuid}
      </Link>
    </p>
  );

  return (
    <div className="addGrant">
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addGrant({
              variables: {
                input: {
                  from,
                  to,
                  dateFrom,
                  dateTo,
                  amount,
                  source,
                  description,
                  internalNotes,
                },
              },
            });
          }}
        >
          <div className="form-group">
            <label htmlFor="fromOrganization">From</label>
            <OrganizationSelector
              value={fromNameMatch}
              setValue={setFromNameMatch}
              onOrgSelected={setFromUuid}
            />
          </div>

          <div className="form-group">
            <label htmlFor="toOrganization">To</label>
            <OrganizationSelector
              value={toNameMatch}
              setValue={setToNameMatch}
              onOrgSelected={setToUuid}
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">
              Amount
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                name="amount"
              />
            </label>
          </div>

          <div className="form-group">
            <DatePicker
              selected={dateFrom}
              onChange={(date) => setDateFrom(date)}
            />
          </div>
          <div className="form-group">
            <DatePicker
              selected={dateTo}
              onChange={(date) => setDateTo(date)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="source">Source</label>
            <input
              value={source}
              onChange={(e) => setSource(e.target.value)}
              name="amount"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            >
              {description}
            </textarea>
          </div>

          <div className="form-group">
            <label htmlFor="internalNotes">Internal notes</label>
            <textarea
              name="internalNotes"
              onChange={(e) => setInternalNotes(e.target.value)}
            >
              {internalNotes}
            </textarea>
          </div>

          <button type="submit">Add Grant</button>
          {created}
          {addGrantLoading && 'Loading...'}
          {error}
        </form>
      </div>
    </div>
  );
};

export default AddGrant;
