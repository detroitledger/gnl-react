/* global jest */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import App from './App';

const mockStore = configureStore();

it('renders', () => {
  shallow(<App store={mockStore({ user: { id: null, isFetching: true } })} />);
});
