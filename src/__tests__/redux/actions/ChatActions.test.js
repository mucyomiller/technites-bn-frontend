/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import thunk from "redux-thunk";
import moxios from "moxios";
import configureStore from "redux-mock-store";
import http from "../../../services/httpServices";
import {
  GET_ALL_MESSAGES,
  GET_ERRORS
} from "../../../redux/actions/actionType";
import { fetchAllMessages } from "../../../redux/actions/ChatActions";
import successresponse from "../../../__mocks__/__get_user_request_success__.json";
import errorreponse from "../../../__mocks__/__get_user_request_failure__.json";

const mockedStore = configureStore([thunk]);
const flushPromises = () => new Promise((resolve) => setImmediate(resolve));
let store;


describe("Chat actions", () => {
    beforeEach(() => {
      store = mockedStore();
      moxios.install(http.dbCall);
    });
  
    afterEach(() => {
      moxios.uninstall(http.dbCall);
    });
  
    it("should fetch all chats", async () => {
      moxios.wait(async () => {
        const request = moxios.requests.mostRecent();
        request.respondWith(successresponse);
        await flushPromises();
      });
      await store.dispatch(fetchAllMessages());
      const calledActions = store.getActions();
      expect(calledActions[0].type).toEqual(GET_ALL_MESSAGES);
    });
    it("should return an error message when fetching messages failed", async () => {
      moxios.wait(async () => {
        const request = moxios.requests.mostRecent();
        request.respondWith(errorreponse);
        await flushPromises();
      });
      await store.dispatch(fetchAllMessages());
      const calledActions = store.getActions();
      expect(calledActions[0].type).toEqual(GET_ERRORS);
    });
    it("it should cover all errors possible when fetching messages", async () => {
        moxios.wait(async () => {
          const request = moxios.requests.mostRecent();
          request.reject({
            message: "error",
          });
          await flushPromises();
        });
        await store.dispatch(fetchAllMessages());
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(GET_ERRORS);
      });
  });