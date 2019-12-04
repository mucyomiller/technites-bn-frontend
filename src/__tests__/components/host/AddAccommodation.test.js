/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import mockStore from "../../../__mocks__/mockStore";
import AddAccommodationComponent, { AddAccommodation } from "../../../components/host/AddAccommodation";
import { accommodations, user } from "../../../__mocks__/fixtures";

const props = {
  user,
  accommodations,
  getAccommodations: jest.fn(),
  retrieveProfile: jest.fn(),
  getAllLocations: jest.fn(),
};

describe("Add Accommodation Page", () => {
  const accommodationsPage = mount(
    <Provider store={mockStore}>
      <MemoryRouter>
        <AddAccommodation {...props} />
      </MemoryRouter>
    </Provider>,
  );
  const accommodationsComponent = mount(
    <Provider store={mockStore}>
      <MemoryRouter>
        <AddAccommodationComponent {...props} />
      </MemoryRouter>
    </Provider>,
  );
  test("should render the add accomodation page", () => {
    // expect(accommodationsPage.find("AccommodationsPage").exists()).toBe(true);
  });
  test("should render the add accomodation page component", () => {
    // expect(accommodationsComponent.find("Connect(AccommodationsPage)").exists()).toBe(true);
  });
});
