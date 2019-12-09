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
      const fileContents = 'file contents';
      const file = new Blob([fileContents], {type : 'text/plain'});
      const handleSubmit = jest.fn();
      accommodationsComponent.find('input[name="accommodation_name"]').simulate("change", {target: {name: "accommodation_name", value: "accommodatio name" } });
      accommodationsComponent.find('select[name="location"]').simulate("change", { target:{name: 'location', value: '1'}});
      accommodationsComponent.find('input[name="service"]').first().simulate('change', {target: {name: "service1", value: "service1"}});
      accommodationsComponent.find('textarea[name="description"]').simulate("change",{ target: { name: 'description', value: 'description' } });
      accommodationsComponent.find('input[id="images"]').simulate('change', {target: {name: "images", files: [file]}});
      accommodationsComponent.find('button[id="save"]').simulate('click', { target: { id: 'submit-request' } });
      accommodationsComponent.find('form[id="acc_form"]').simulate('submit');
      // expect(handleSubmit).toHaveBeenCalled();

      // console.log('accommodationsComponent.state()', accommodationsComponent.state())
  });
  test("should render the add accomodation page component", () => {
    // expect(accommodationsComponent.find("Connect(AccommodationsPage)").exists()).toBe(true);
  });
});
