import fetch from 'isomorphic-fetch';

import LedgerApi from './LedgerApi';

export const API_HOST = 'https://data.detroitledger.org';
//export const API_HOST = 'https://localhost:3000';

/**
 *  Mutate an array of responses into an object keyed by their IDs.
 *
 * @param array
 * @return object
 */
export const normalizeToObject = (res) => {
  return Object.assign(...res.map(d => ({ [d['id']]: d  })));
};

export const fetchUserpdfs = () => {
  return fetch(`${API_HOST}/api/1.0/assigned_pdfs.json`, { credentials: 'include' })
  .then((response) => {
    return response.json();
  })
  .then((rawUserpdfs) => {
    return Promise.resolve(normalizeToObject(rawUserpdfs));
  });
};

export const updateUserpdf = (id, currentpg, done) => {
  return fetch(`${API_HOST}/services/session/token`, {
    method: 'GET',
    credentials: 'include',
  })
  .then(function(response) {
    return response.text();
  })
  .then(function(token) {
    return fetch(`${API_HOST}/api/1.0/assigned_pdfs/${id}.json`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'X-CSRF-Token': token,
      },
      body: JSON.stringify({
        currentpg,
        done,
      }),
    });
  })
  .then((response) => {
    return response.json();
  })
  .then((rawUserpdf) => {
    return Promise.resolve(normalizeToObject([rawUserpdf]));
  });
};

export const fetchCurrentUser = () => {
  const client = new LedgerApi({ apiUrl: `${API_HOST}/api/1.0`, baseUrl: API_HOST });

  return client.getToken()
  .then(function(token) {
    return fetch(`${API_HOST}/api/1.0/system/connect.json`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'X-CSRF-Token': token,
      },
    });
  })
  .then((response) => {
    return response.json();
  })
  .then((rawSessioninfo) => {
    return Promise.resolve({
      id: rawSessioninfo.user.uid,
      name: rawSessioninfo.user.name,
    });
  });
};

export const createGrant = (grantToBe) => {
  const client = new LedgerApi({ apiUrl: `${API_HOST}/api/1.0`, baseUrl: API_HOST });

  return client.getToken()
    .then((token) => {
      const drupalized = LedgerApi.grantDetemplate(grantToBe);
      return client.createGrant(drupalized, token);
    })
    .then(response => client.grantById(response.nid));
};