/* eslint-disable import/no-named-as-default-member */
/* eslint-disable quotes */
/* eslint-disable import/named */
/* eslint-disable no-undef */
import React from "react";
import { mount } from "enzyme";
import App from '../../../components/App';
import { setJwtToLocalStorage } from "../../../services/authServices";
import VerifyEmailPage from '../../../components/register-page/VerifyEmail';
import NotFound from '../../../components/not-found/NotFound';

describe("<ProtectedRoute />", () => {
  it("should taste the protected route without the token", () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtaWx5a2Fzc2ltMDEyQGdtYWlsLmNvbSIsImlhdCI6MTU3MzUzODEyNywiZXhwIjoxNTczNjI0NTI3fQ.sEM3HC_fOraqXEZBMcMzf1Olmpv2XrxpnebB0ZRcFSo';
    setJwtToLocalStorage(token);
    const wrapper = mount(<App />);
    const protectedRoute = wrapper.find('ProtectedRoute');
    expect(wrapper).toHaveLength(1);
    expect(protectedRoute).toHaveLength(1);
  });

  it("should taste the protected route without the token thus redirecting the user to login page", () => {
    setJwtToLocalStorage(null);
    const wrapper = mount(<App />);
    const loginRoute = wrapper.find('Route[path="/login"]');
    expect(wrapper).toHaveLength(1);
    expect(loginRoute).toHaveLength(1);
  });

  it("should mount the verify email component", () => {
    setJwtToLocalStorage(null);
    const wrapper = mount(<VerifyEmailPage />);
    const form = wrapper.find('form[className="card"]');
    expect(form).toHaveLength(1);
  });

  it("should mount the not found component", () => {
    setJwtToLocalStorage(null);
    const wrapper = mount(<NotFound />);
    const div = wrapper.find('div');
    expect(div).toHaveLength(1);
  });
});
