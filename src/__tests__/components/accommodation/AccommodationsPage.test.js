/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import mockStore from "../../../__mocks__/mockStore";
import AccommodationsComponent, { AccommodationsPage } from "../../../components/accommodation/AccommodationsPage";
import { accommodations, user } from "../../../__mocks__/fixtures";
import { messages } from "../../../__mocks__/fixtures";
const props = {
  messages,
  user,
  accommodations,
  getAccommodations: jest.fn(),
  retrieveProfile: jest.fn(),
};

describe("Accommodations Page", () => {
  const accommodationsPage = mount(
    <Provider store={mockStore}>
      <MemoryRouter>
        <AccommodationsPage {...props} />
      </MemoryRouter>
    </Provider>,
  );
  const accommodationsComponent = mount(
    <Provider store={mockStore}>
      <MemoryRouter>
        <AccommodationsComponent {...props} />
      </MemoryRouter>
    </Provider>,
  );
  test("should render the accomodations page", () => {
    expect(accommodationsPage.find("AccommodationsPage").exists()).toBe(true);
  });
  test("should render the accomodations page component", () => {
    expect(accommodationsComponent.find("Connect(AccommodationsPage)").exists()).toBe(true);
  });
});
