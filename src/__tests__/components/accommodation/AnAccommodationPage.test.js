/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import mockStore from "../../../__mocks__/mockStore";
import { accommodation, user } from "../../../__mocks__/fixtures";
import AccPage, {
  AnAccommodationPage,
} from "../../../components/accommodation/AnAccommodationPage";

const props = {
  accId: 1,
  accommodation,
  user,
  getAccommodation: jest.fn(),
  retrieveProfile: jest.fn(),
};

describe("An Accommodation page", () => {
  const accPage = mount(
    <Provider store={mockStore}>
      <MemoryRouter>
        <AnAccommodationPage {...props} />
      </MemoryRouter>
    </Provider>,
  );

  test("should render the gallery section", () => {
    expect(accPage.find(".gallery").exists()).toBe(true);
  });

  describe("overview", () => {
    test("should render the overview section", () => {
      expect(accPage.find(".overview").exists()).toBe(true);
    });
  });

  describe("accommodation details", () => {
    test("should render the accommmodatin details", () => {
      expect(accPage.find(".acc__details").exists()).toBe(true);
    });

    test("should render the accomaditon map", () => {
      expect(accPage.find(".acc__details__map").exists()).toBe(true);
    });
  });
});

describe("Accommodation page component", () => {
  //   const accPageComponent = mount(
  //     <Provider store={mockStore}>
  //       <MemoryRouter>
  //         <AccPage {...props} />
  //       </MemoryRouter>
  //     </Provider>,
  //   );
//   test("should mount acc page component", () => {
//     // console.log("accPageComponent.debug()", accPageComponent.debug());
//   });
});
