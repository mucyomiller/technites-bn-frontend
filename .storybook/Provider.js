/* eslint-disable react/prop-types */
import React from 'react';
import { Provider as ProviderWrapper } from 'react-redux';
import { browserHistory, MemoryRouter } from 'react-router';
import configureStore from '../src/redux/store/configureStore';
const store = configureStore({});
export default function Provider({ story }) {
  return (
    <ProviderWrapper store={store}>
      <MemoryRouter>
        {story}
      </MemoryRouter>
    </ProviderWrapper>
  );
};