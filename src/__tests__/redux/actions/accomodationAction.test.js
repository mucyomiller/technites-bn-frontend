/* eslint-disable comma-dangle */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable no-undef */
import React from 'react';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import Enzyme from 'enzyme/build';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16/build';
import http from '../../../services/httpServices';
import {
  GET_ACCOMODATIONS,
  GET_ACCOMODATION,
  GET_ALL_ACCOMODATIONS,
  GET_LOCATIONS,
  LIKE_UNLIKE_ACCOMMODATION,
  CREATE_ACCOMMODATION,
  LOADING
} from '../../../redux/actions/actionType';
import { getAccomodations } from '../../../redux/actions/getAccomodations';
import { getRooms } from '../../../redux/actions/getRooms';
import {
  LikeUnLikeAccommodation,
  createAccommodation,
  getAccommodation,
  getAccommodations,
  getAllLocations
} from '../../../redux/actions/accommodatinsAction';
import errorreponse from '../../../__mocks__/__get_user_request_failure__.json';
import { accommodation, newAcc } from '../../../__mocks__/fixtures';

Enzyme.configure({ adapter: new Adapter() });

let store;
const mockedStore = configureStore([thunk]);

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe('Accommodation Actions', () => {
  beforeEach(() => {
    store = mockedStore();
    moxios.install(http.dbCall);
  });

  afterEach(() => {
    moxios.uninstall(http.dbCall);
  });

  test('should create an accommodation', async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          data: accommodation,
          message: 'Accomodation added successfully!'
        }
      });
      await flushPromises();
    });

    await store.dispatch(createAccommodation(newAcc));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(LOADING);
    expect(calledActions[1].type).toEqual(CREATE_ACCOMMODATION);
  });

  test('should get all accommodations', async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({response: { status: 200, data: {} }});
      await flushPromises();
    });

    await store.dispatch(getAccommodations());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_ACCOMODATIONS);
  });

  test('should get an accommodation', async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({response: { status: 200, data: {} }});
      await flushPromises();
    });

    await store.dispatch(getAccommodation());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_ACCOMODATION);
  });

  test('should all locations', async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({response: { status: 200, data: {} }});
      await flushPromises();
    });

    await store.dispatch(getAllLocations());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_LOCATIONS);
  });

  it('should trigger the accomodation action', async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 200,
          message: 'Successfully registered in',
          data: [{}]
        }
      });
      await flushPromises();
    });

    await store.dispatch(getAccomodations());
    const calledActions = store.getActions();

    expect(calledActions[0].type).toEqual(GET_ALL_ACCOMODATIONS);
  });

  it('should trigger the room action', async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 200,
          message: 'Successfully registered in',
          data: [{}]
        }
      });
      await flushPromises();
    });

    await store.dispatch(getRooms());
    store.getActions();
  });

  it('should test the accomodation error', async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorreponse);
      await flushPromises();
    });
    await store.dispatch(getAccomodations());
    store.getActions();
  });

  it('should test the room error', async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorreponse);
      await flushPromises();
    });
    await store.dispatch(getRooms());
    store.getActions();
  });
  it('should test LikeUnLikeAccommodation like_success', async () => {
    const resp = {
      status: 200,
      response: {
        status: 200,
        message: 'Liked  Successfuly'
      }
    };
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(resp);
      await flushPromises();
    });
    await store.dispatch(LikeUnLikeAccommodation(1));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(LIKE_UNLIKE_ACCOMMODATION);
  });

  it('should test LikeUnLikeAccommodation like_error', async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        message: 'Network Error'
      });
      await flushPromises();
    });
    await store.dispatch(LikeUnLikeAccommodation(1));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(LIKE_UNLIKE_ACCOMMODATION);
  });
});
