import reducer, { getHasPDFs } from './';

import { MOCK_API_RESPONSES } from '../actions/fixtures';
import { normalizeToObject } from '../api';

const emptyStore = {
  byId: {},
  listByFilter: {
    active: {
      errorMessage: null,
      ids: [],
      isFetching: false,
    },
    all: {
      errorMessage: null,
      ids: [],
      isFetching: false,
    },
    completed: {
      errorMessage: null,
      ids: [],
      isFetching: false,
    },
  },
  user: {
    id: null,
    name: null,
    isFetching: true,
  },
  router: { location: null },
  tour: { active: false, step: 1 },
  preTourState: {},
  grants: { isCreating: false, byId: {} },
};

describe('big ol reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(emptyStore);
  });

  it('should handle FETCH_USERPDFS_SUCCESS', () => {
    expect(
      reducer(
        {},
        {
          type: 'FETCH_USERPDFS_SUCCESS',
          response: normalizeToObject(MOCK_API_RESPONSES.assignedPdfs),
        }
      )
    ).toEqual({
      ...emptyStore,
      byId: {
        '2': {
          currentpg: 5,
          done: true,
          id: 2,
          org: {
            id: 55,
            name: 'Bollywood Music Festival - Michigan Philharmonic',
          },
          pdfurl: 'http://google.com/aliens-are-real.pdf',
          year: 2389,
        },
        '3': {
          currentpg: 666,
          done: false,
          id: 3,
          org: {
            id: 10360,
            name: 'SHA-SHA’S KIDDY KORNER CHILD CARE',
          },
          pdfurl: 'http://pdfs.com/pdf.pdf',
          year: 1983,
        },
        '3679': {
          id: 3679,
          org: {
            id: 3679,
            name: 'Men Who Dare, Inc',
          },
          pdfurl: 'https://pdf.pdf/pdf.pdf.pdf',
          done: false,
          year: 2019,
          currentpg: 0,
        },
      },
      listByFilter: {
        active: {
          errorMessage: null,
          ids: ['3', '3679'],
          isFetching: false,
        },
        all: {
          errorMessage: null,
          ids: ['2', '3', '3679'],
          isFetching: false,
        },
        completed: {
          errorMessage: null,
          ids: ['2'],
          isFetching: false,
        },
      },
    });
  });

  it('should handle FETCH_CURRENTUSER_REQUEST', () => {
    const userpart = reducer(
      {},
      {
        type: 'FETCH_CURRENTUSER_REQUEST',
      }
    ).user;
    expect(userpart).toEqual({ id: null, name: null, isFetching: true });
  });

  it('should handle FETCH_CURRENTUSER_SUCCESS', () => {
    const userpart = reducer(
      {},
      {
        type: 'FETCH_CURRENTUSER_SUCCESS',
        response: MOCK_API_RESPONSES.normalizedSystemConnect,
      }
    ).user;
    expect(userpart).toEqual({ id: '1', name: 'admin', isFetching: false });
  });
});

describe('getHasPDFs', () => {
  it('has no pdfs when array is empty', () => {
    expect(getHasPDFs([])).toEqual(false);
  });

  it('has no pdfs when no id is specified', () => {
    expect(getHasPDFs([{ id: 123 }])).toEqual(false);
  });

  it('has no pdfs when the id is not in the list', () => {
    expect(getHasPDFs([{ id: 123 }], '456')).toEqual(false);
  });

  it('finds the right pdf in the list', () => {
    expect(getHasPDFs([{ id: 123 }], '123')).toEqual(true);
    expect(getHasPDFs([{ id: 123 }], 123)).toEqual(true);
  });
});
