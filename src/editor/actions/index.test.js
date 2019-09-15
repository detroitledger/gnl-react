import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as actions from './';
import reducer from '../reducers';
import { MOCK_API_RESPONSES } from './fixtures';
import { API_HOST } from '../api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetch userpdfs', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('emits FETCH_USERPDFS_SUCCESS when fetching userpdfs is done', () => {
    const nockScope = nock(API_HOST)
    .get('/api/1.0/assigned_pdfs.json')
    .reply(200, MOCK_API_RESPONSES.assignedPdfs);

    const expectedActions = [
      {
        type: 'FETCH_USERPDFS_REQUEST',
      },
      {
        type: 'FETCH_USERPDFS_SUCCESS',
        response: {
          '2': {
            'id': 2,
            'org': { 'id': 55, 'name': 'Bollywood Music Festival - Michigan Philharmonic' },
            'pdfurl': 'http://google.com/aliens-are-real.pdf',
            'done': true,
            'year': 2389,
            'currentpg': 5,
          },
          '3': {
            'id': 3,
            'org': { 'id': 10360, 'name': 'SHA-SHA\u2019S KIDDY KORNER CHILD CARE' },
            'pdfurl': 'http://pdfs.com/pdf.pdf',
            'done': false,
            'year': 1983,
            'currentpg': 666,
          },
          '3679': {
            'id': 3679,
            'org': { 'id': 3679, 'name': 'Men Who Dare, Inc' },
            'pdfurl': 'https://pdf.pdf/pdf.pdf.pdf',
            'done': false,
            'year': 2019,
            'currentpg': 0,
          },
        },
      },
    ];

    const defaultState = reducer(undefined, {});
    const store = mockStore(defaultState);

    return store.dispatch(actions.fetchUserpdfs('all')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(nockScope.isDone()).toBe(true);
    });
  });
});

describe('update userpdf', () => {
  it('emits UPDATE_USERPDF_SUCCESS when updating a userpdf is done', () => {
    const nockScope = nock(API_HOST)
    .get('/services/session/token')
    .reply(200, 'whatever')
    .put('/api/1.0/assigned_pdfs/2.json', {
      currentpg: 6,
      done: false,
    })
    .reply(200, MOCK_API_RESPONSES.updatedPdf);

    const expectedActions = [
      {
        type: 'UPDATE_USERPDF_REQUEST',
        request: { currentpg: 6, done: false },
      },
      {
        type: 'UPDATE_USERPDF_SUCCESS',
        response: {
          '2': {
            'id': 2,
            'org': { 'id': 55, 'name': 'Bollywood Music Festival - Michigan Philharmonic' },
            'pdfurl': 'http://google.com/aliens-are-real.pdf',
            'done': false,
            'year': 2389,
            'currentpg': 6,
          },
        },
      },
    ];

    const store = mockStore({
      "byId": {
        "2": {
          "currentpg": 5,
          "done": true,
          "id": 2,
          "org": {
            "id": 55,
            "name": "Bollywood Music Festival - Michigan Philharmonic",
          },
          "pdfurl": "http://google.com/aliens-are-real.pdf",
          "year": 2389,
        },
        "3": {
          "currentpg": 666,
          "done": false,
          "id": 3,
          "org": {
            "id": 10360,
            "name": "SHA-SHA’S KIDDY KORNER CHILD CARE",
          },
          "pdfurl": "http://pdfs.com/pdf.pdf",
          "year": 1983,
        },
        '3679': {
          'id': 3679,
          'org': { 'id': 3679, 'name': 'Men Who Dare, Inc' },
          'pdfurl': 'https://pdf.pdf/pdf.pdf.pdf',
          'done': false,
          'year': 2019,
          'currentpg': 0,
        },
      },
      "listByFilter": {
        "active": {
          "errorMessage": null,
          "ids": [ "3", '3679' ],
          "isFetching": false,
        },
        "all": {
          "errorMessage": null,
          "ids": [ "2", "3", '3679' ],
          "isFetching": false,
        },
        "completed": {
          "errorMessage": null,
          "ids": [ "2" ],
          "isFetching": false,
        },
      },
      "tour": {
        "active": false,
      },
    });

    return store.dispatch(actions.updateUserpdf(2, 6, false)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(nockScope.isDone()).toBe(true);
    });
  });
});

describe('fetch current user information', () => {
  it('emits FETCH_CURRENTUSER_SUCCESS when fetching current user information is done', () => {
    const nockScope = nock(API_HOST)
    .get('/services/session/token')
    .reply(200, 'whatever')
    .post('/api/1.0/system/connect.json')
    .reply(200, MOCK_API_RESPONSES.systemConnect);

    const expectedActions = [
      {
        type: 'FETCH_CURRENTUSER_REQUEST',
      },
      {
        type: 'FETCH_CURRENTUSER_SUCCESS',
        response: {
          id: '1',
          name: 'admin',
        },
      },
    ];

    const store = mockStore({
      "byId": {},
      "listByFilter": {
        "active": {
          "errorMessage": null,
          "ids": [ ],
          "isFetching": false,
        },
        "all": {
          "errorMessage": null,
          "ids": [ ],
          "isFetching": false,
        },
        "completed": {
          "errorMessage": null,
          "ids": [ ],
          "isFetching": false,
        },
      },
      user: {
        id: null,
        name: null,
      },
    });

    return store.dispatch(actions.fetchCurrentUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(nockScope.isDone()).toBe(true);
    });
  });
});
