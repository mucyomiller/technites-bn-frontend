/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable quotes */
/* eslint-disable import/named */
/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { ProtectedRoute } from '../../../components/protected-route/ProtectedRoute';

const props = {
  isAuthenticated: false,
};

describe('Protected Route', () => {
  const protectedRoute = mount(
    <BrowserRouter>
      <ProtectedRoute {...props} />
    </BrowserRouter>,
  );

  test('should redirect to login when user is not authenticated', () => {
    expect(protectedRoute.instance().history.location.pathname).toEqual('/login');
  });
});
