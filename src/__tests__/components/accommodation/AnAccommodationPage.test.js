/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Provider } from "react-redux";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import mockStore from "../../../__mocks__/mockStore";
import { MapContainer } from '../../../components/shared/map/MapContainer';
import { accommodation, accommodationNoImageAndRooms, user, messages } from "../../../__mocks__/fixtures";
import AccPage, {
  AnAccommodationPage, mapStateToProps
} from "../../../components/accommodation/AnAccommodationPage";

const props = {
  accId: 1,
  accommodation,
  user,
  getAccommodation: jest.fn(),
  retrieveProfile: jest.fn(),
  messages,
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
    test("should simulate like an accomaditon facility", () => {
      accPage.find(".overview__rating-count").props().onClick();
    });
    test("should test recieving props", () => {
      const accPage = shallow(<AnAccommodationPage {...props} />);
      const state = { likeAction: true };
      accPage.setState(state);
      accPage.setProps({ accId: 1 });
    });
    test("should test accommodation with no rooms and images", () => {
      const localprops = {
        accId: 1,
        accommodation: accommodationNoImageAndRooms,
        user,
        getAccommodation: jest.fn(),
        retrieveProfile: jest.fn(),
      }
      const accPage = shallow(<AnAccommodationPage {...localprops} />);
      const state = { likeAction: true };
      accPage.setState(state);
      accPage.setProps({ accId: 1 });
    });

    test("should test accommodation with liked", () => {
      const localprops = {
        accId: 1,
        accommodation: { ...accommodationNoImageAndRooms, liked: true },
        user,
        getAccommodation: jest.fn(),
        retrieveProfile: jest.fn(),
      }
      const accPage = shallow(<AnAccommodationPage {...localprops} />);
      const state = { likeAction: true };
      accPage.setState(state);
      accPage.setProps({ accId: 1 });
    });

    test("should test map state to props", () => {
      const state = { accommodations: { accommodation: [{}], averageRatings: 1, accommodationsLikes: 1 }, profile: { user: {} } }
      const ownProps = { match: { params: { acc_id: 1 } } }
      mapStateToProps(state, ownProps);
    });

    test("should test the map container", () => {
      const props = {
        lat: -1.2884,
        lng: 36.8233,
        name: 'Hotel Name'
      };

      const state = {
        showingInfoWindow: true, // Hides or the shows the infoWindow
        activeMarker: {}, // Shows the active marker upon click
        selectedPlace: { name: "" }, // Shows the infoWindow to the selected place upon a marker
      };

      const mapContainer = shallow(<MapContainer {...props} />);
      mapContainer.setState(state);
      const marker = mapContainer.find('Marker');
      const infoWindow = mapContainer.find('InfoWindow');
      console.log('the info window is : ', infoWindow.debug());
      // marker.simulate('click');
      infoWindow.simulate('close');
    });

  });

});
