import reducer from './grants';

const emptyStore = {
  isCreating: false,
  byId: {},
};

describe('grants reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(emptyStore);
  });
  
  it('should handle CREATE_GRANT_REQUEST', () => {
    const initial = reducer(undefined, {});
    
    const requesting = reducer(initial, {
      type: 'CREATE_GRANT_REQUEST',
    });
    
    expect(requesting)
    .toEqual({
      isCreating: true,
      byId: {},
    });
  });
  
  it('should handle CREATE_GRANT_FAILURE', () => {
    const initial = reducer(undefined, {});
    
    const requesting = reducer(initial, {
      type: 'CREATE_GRANT_REQUEST',
    });
    
    const failed = reducer(requesting, {
      type: 'CREATE_GRANT_FAILURE',
    });
    
    expect(failed)
    .toEqual({
      isCreating: false,
      byId: {},
    });
  });

  it('should handle CREATE_GRANT_SUCCESS', () => {
    const initial = reducer(undefined, {});
    
    const created = reducer(initial, {
      type: 'CREATE_GRANT_SUCCESS',
      response: { id: 1, foo: 'bar' },
    });
    
    expect(created).toEqual({
      ...emptyStore,
      byId: {
        '1': {
          id: 1,
          foo: 'bar',
        },
      },
    });
  });
});