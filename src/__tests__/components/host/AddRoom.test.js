/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import mockStore from "../../../__mocks__/mockStore";
import AddRoomComponent, { AddRoom } from "../../../components/host/AddRoom";
import { accommodations, user } from "../../../__mocks__/fixtures";

const props = {
  user,
  accommodations,
  retrieveProfile: jest.fn(),
  getMyAccommodations: jest.fn(),
};

describe("Add Rooms Page", () => {
  const accommodationsPage = mount(
    <Provider store={mockStore}>
      <MemoryRouter>
        <AddRoom {...props} />
      </MemoryRouter>
    </Provider>,
  );
  const accommodationsComponent = mount(
    <Provider store={mockStore}>
      <MemoryRouter>
        <AddRoomComponent {...props} />
      </MemoryRouter>
    </Provider>,
  );
  test("should render the add room page", () => {
      const fileContents = 'file contents';
      const file = new Blob([fileContents], {type : 'text/plain'});
      const handleSubmit = jest.fn();
      accommodationsComponent.find('select[id="accommodation_id"]').simulate("change", { target:{ value: '1'} });
      accommodationsComponent.find('input[name="name"]').simulate("change", {target: {name: "name", value: "room name" } });
      accommodationsComponent.find('select[id="room_type"]').simulate("change", { target:{ value: 'Single room'} });
      accommodationsComponent.find('textarea[name="description"]').simulate("change",{ target: { name: 'description', value: 'description' } });
      accommodationsComponent.find('input[id="images"]').simulate('change', {target: {name: "images", files: [file]}});
      accommodationsComponent.find('button[id="save"]').simulate('click', { target: { id: 'submit-request' } });
      accommodationsComponent.find('form[id="room_form"]').simulate('submit');
      // expect(handleSubmit).toHaveBeenCalled();

      // console.log('accommodationsComponent.state()', accommodationsComponent.state())
  });
  test("should render the add room page component", () => {
    // expect(accommodationsComponent.find("Connect(AccommodationsPage)").exists()).toBe(true);
  });
});
